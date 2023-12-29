import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EmailExists } from 'src/validation/emailExists.validator';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Este campo deve ser um email' })
  @EmailExists({ message: 'Este email já existe' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsOptional()
  password: string;
}
