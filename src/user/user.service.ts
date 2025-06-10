import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createuser.dto';
import { LoginUserDto } from './dto/login.dto';
import { HashService } from '../auth/hash.service';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const isEmail = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });
    const isUser = await this.prismaService.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (isEmail) {
      throw new ConflictException('Email already exists');
    }

    if (!createUserDto.password) {
      throw new ConflictException('Password is required');
    }
    if (isUser) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await this.hashService.hashPassword(
      createUserDto.password,
    );

    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
      },
    });
  }

  async login(Login: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { email: Login.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isPasswordValid = await this.hashService.comparePassword(
      Login.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload), // async preferred
    };
  }
  async generateToken(payload: any, expiresIn: string = '1d'): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn });
  }
  async getUsers() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });
  }
  async deleteUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new BadRequestException('User not found with this specification!');
    }
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
