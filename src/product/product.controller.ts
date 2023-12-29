import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { ProductEntity } from './product.entity';
import { v4 as id } from 'uuid';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async createProduct(@Body() product: CreateProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.id = id();
    productEntity.name = product.name;
    productEntity.userId = product.userId;
    productEntity.price = product.price;
    productEntity.count = product.count;
    productEntity.description = product.description;
    productEntity.category = product.category;
    productEntity.properties = product.properties;
    productEntity.images = product.images;

    this.productRepository.save(productEntity);
    return {
      product: productEntity,
      message: 'produto criado com sucesso',
    };
  }

  @Get()
  async listProducts() {
    return this.productRepository.list();
  }

  @Put('/:id')
  async updateProducts(
    @Param('id') id: string,
    @Body() updateDatas: UpdateProductDTO,
  ) {
    const updateProduct = await this.productRepository.update(id, updateDatas);

    return {
      product: updateProduct,
      message: 'produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    const removeProduct = await this.productRepository.remove(id);

    return {
      product: removeProduct,
      message: 'produto removido com sucesso',
    };
  }
}
