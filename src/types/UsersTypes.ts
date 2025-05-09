// aqui estara mi esquema de usuarios
// 
import { Repository } from "./RepositoryTypes";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}
//respositorio de usuarios donde se buscara la data de los usuarios
export interface IUserRepository extends Repository<User> {}
//metodos de los usuarios
// aqui estara la logica de los usuarios
export interface IUserService {
  createUser(user: User): Promise<User>;
  findUsers(): Promise<User[]>;
}