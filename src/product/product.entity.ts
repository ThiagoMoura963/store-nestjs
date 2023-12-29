import { ProductImageDto } from './ProductImage.dto';
import { ProductPropertyDTO } from './dto/CreateProduct.dto';

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  price: number;
  count: number;
  description: string;
  properties: ProductPropertyDTO[];
  images: ProductImageDto[];
  category: string;
}
