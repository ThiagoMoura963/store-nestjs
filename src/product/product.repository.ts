import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  private getProductById(id: string) {
    const potentialProduct = this.products.find((product) => product.id === id);

    if (!potentialProduct) {
      throw new Error('Usuário não existe');
    }

    return potentialProduct;
  }

  async save(product: ProductEntity) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }

  async update(id: string, updateProduct: Partial<ProductEntity>) {
    const product = this.getProductById(id);

    Object.entries(updateProduct).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      product[key] = value;
    });

    return product;
  }

  async remove(id: string) {
    const product = this.getProductById(id);

    this.products = this.products.filter((product) => product.id !== id);

    return product;
  }
}
