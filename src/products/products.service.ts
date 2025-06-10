import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async addProduct(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
      },
    });
  }
  async getProducts() {
    return this.prismaService.product.findMany();
  }
  async deleteProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id: id },
    });
    if (!product) {
      throw new BadRequestException(
        'Product not found with this specification!',
      );
    }
    return await this.prismaService.product.delete({
      where: {
        id: id,
      },
    });
  }
  async updateProduct(id: number, updateProductDto: CreateProductDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: id },
    });
    if (!product) {
      throw new BadRequestException(
        'Product not found with this specification!',
      );
    }
    return await this.prismaService.product.update({
      where: { id: id },
      data: updateProductDto,
    });
  }
}
