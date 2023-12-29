import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private getUserById(id: string) {
    const potentialUser = this.users.find((user) => user.id === id);

    if (!potentialUser) {
      throw new Error('Usuário não existe');
    }

    return potentialUser;
  }

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async list() {
    return this.users;
  }

  async existWithEmail(email: string) {
    const potentialUser = this.users.find((user) => user.email === email);

    return potentialUser !== undefined;
  }

  async update(id: string, updateUser: Partial<UserEntity>) {
    const user = this.getUserById(id);

    Object.entries(updateUser).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async remove(id: string) {
    const user = this.getUserById(id);

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
