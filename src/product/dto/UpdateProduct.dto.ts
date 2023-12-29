import {
  IsArray,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
  IsNumber,
  ArrayMinSize,
  IsString,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductPropertyDTO, ProductImageDTO } from './CreateProduct.dto';

export class UpdateProductDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  @IsOptional()
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @IsOptional()
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'O preço precisa conter 2 casas decimais' },
  )
  @IsPositive({ message: 'O preço precisa ser um valor positivo' })
  @IsOptional()
  price: number;

  @IsNumber(undefined, {
    message: 'A quantidade precisa ser um valor positivo',
  })
  @IsPositive()
  @IsOptional()
  count: number;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vázia' })
  @MaxLength(1000, {
    message: 'A descrição não pode ter mais que 1000 caracteres',
  })
  @IsOptional()
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductPropertyDTO)
  @IsOptional()
  properties: ProductPropertyDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  images: ProductImageDTO[];

  @IsNotEmpty({ message: 'A cateogia é obrigatória' })
  @IsOptional()
  category: string;
}
