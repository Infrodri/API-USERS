//es el repositorio de usuarios se encarga de cargar la data de los usuarios
// y de crear los usuarios en la base de datos

import { IUserRepository, User } from "types/UsersTypes";

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: User): Promise<User> {
    this.users.push(data);
    return data;
  }

  async find(): Promise<User[]> {
    return this.users;
  }
}