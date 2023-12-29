import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { EmailExistsValidator } from 'src/validation/emailExists.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailExistsValidator],
})
export class UserModule {}
