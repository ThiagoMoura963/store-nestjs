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
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductPropertyDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome da característica é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'A descrição da característica é obrigatório',
  })
  description: string;
}

export class CreateProductDTO {
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: 'O preço precisa conter 2 casas decimais' },
  )
  @IsPositive({ message: 'O preço precisa ser um valor positivo' })
  price: number;

  @IsNumber(undefined, {
    message: 'A quantidade precisa ser um valor positivo',
  })
  @IsPositive()
  count: number;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vázia' })
  @MaxLength(1000, {
    message: 'A descrição não pode ter mais que 1000 caracteres',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductPropertyDTO)
  properties: ProductPropertyDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsNotEmpty({ message: 'A cateogia é obrigatória' })
  category: string;
}

export class ProductImageDTO {
  @IsUrl(undefined, { message: 'URL para imagem inválida ' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição da imagem é obrigatória' })
  description: string;

  user: {
    name: string;
    email: string;
  };
}
