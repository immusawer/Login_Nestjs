import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.addProduct(createProductDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('get')
  async getProducts() {
    return this.productsService.getProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteProduct(@Body('id') id: number) {
    return this.productsService.deleteProduct(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProduct(@Body() updateData: { id: number } & CreateProductDto) {
    const { id, ...CreateProductDto } = updateData;
    return this.productsService.updateProduct(id, CreateProductDto);
  }
}
