import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsService } from 'src/products/products.service';

@Global()
@Module({
  providers: [PrismaService, ProductsService],
  exports: [PrismaService],
})
export class PrismaModule {}
