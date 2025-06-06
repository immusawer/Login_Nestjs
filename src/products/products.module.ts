import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({})
export class ProductsModule {
  imports: [PrismaModule];
  providers: [PrismaService, ProductsService];
  controllers: [ProductsController];
}
