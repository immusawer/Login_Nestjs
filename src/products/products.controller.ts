import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
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
}
