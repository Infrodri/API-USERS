import { Request, Response, RequestHandler } from "express";
import { UserService } from "@services/userService";
import { UserRepository } from "@repositories/userRepositories";

/**
 * @class UserController
 * @description Controlador para gestionar las operaciones CRUD de los usuarios.
 */
class UserController {
  private userRepository: UserRepository;
  private userService: UserService;

  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
  }

  /**
   * @method getAll
   * @description Obtiene una lista de todos los usuarios.
   */
  public getAll: RequestHandler = async (req, res) => {
    const users = await this.userService.findUsers(req.query);
    res.status(200).json(users);
  };

  /**
   * @method getById
   * @description Obtiene un usuario por su ID.
   */
  public getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const user = await this.userService.findUsersById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  };

  /**
   * @method create
   * @description Crea un nuevo usuario.
   */
  public create: RequestHandler = async (req, res) => {
    const newUser = await this.userService.createUser(req.body);
    res.status(201).json(newUser);
  };

  /**
   * @method update
   * @description Actualiza un usuario existente por su ID.
   */
  public update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await this.userService.updateUser(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  };

  /**
   * @method delete
   * @description Elimina un usuario por su ID.
   */
  public delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const success = await this.userService.deleteUser(id);
    if (!success) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).send();
  };
}

export default new UserController();
