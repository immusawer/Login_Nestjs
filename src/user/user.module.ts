import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashService } from '../auth/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
      global: true, // optional to make it global app-wide
    }),
  ],
  providers: [UserService, HashService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService, HashService, JwtModule, PassportModule],
})
export class UserModule {}
