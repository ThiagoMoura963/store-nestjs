import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ProductImageDto {
  @IsUrl(undefined, { message: 'URL para imagem inválida ' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição da imagem é obrigatória' })
  description: string;
}
