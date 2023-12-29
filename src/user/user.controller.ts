import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as id } from 'uuid';
import { ListUserDTO } from './dto/ListUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const userEntity = new UserEntity();

    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.id = id();

    this.userRepository.save(userEntity);

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'usuário criado com sucesso',
    };
  }

  @Get()
  async listUsers() {
    const users = await this.userRepository.list();
    const usersList = users.map((user) => new ListUserDTO(user.id, user.name));

    return usersList;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateDatas: UpdateUserDTO,
  ) {
    const updateUser = await this.userRepository.update(id, updateDatas);

    return {
      user: updateUser,
      message: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removeUser = await this.userRepository.remove(id);

    return {
      user: removeUser,
      message: 'usuário removido com sucesso',
    };
  }
}
