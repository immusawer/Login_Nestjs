import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HashService } from './user/hash.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UserModule, PrismaModule, ProductsModule],
  controllers: [AppController, UserController, ProductsController],
  providers: [AppService, PrismaService, UserService, HashService, ProductsService],
  exports: [PrismaService],
})
export class AppModule {}
