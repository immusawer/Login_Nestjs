import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // this comes from the validate() method in JwtStrategy
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return this.userService.getUsers(); // Assuming getUser is a method in UserService that fetches user by ID
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Body('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
