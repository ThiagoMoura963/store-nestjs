import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailExists } from 'src/validation/emailExists.validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail(undefined, { message: 'Este campo deve ser um email' })
  @EmailExists({ message: 'Este email já existe' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
