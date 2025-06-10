import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async addProduct(createProductDto: CreateProductDto) {
    await this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
      },
    });
    return 'Product created';
  }
  async getProducts() {
    return this.prismaService.product.findMany();
  }
}
