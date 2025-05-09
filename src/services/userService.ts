// mi logica del negocio
// aqui estara la logica de los usuarios     
import { IUserRepository, IUserService, User } from "types/UsersTypes";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
//primer metodo de crear usuarios 
  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
//segundo metodo de busqueda de usuarios listar los usuarios
  // este metodo es el que se encarga de buscar los usuarios en la base de datos
  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}