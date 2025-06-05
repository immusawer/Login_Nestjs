import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HashService } from './user/hash.service';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService, HashService],
  exports: [PrismaService],
})
export class AppModule {}
