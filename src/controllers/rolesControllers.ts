import { Request, Response, RequestHandler } from "express";
import { RolesService } from "@services/RolesService";
import { RolesRepository } from "@repositories/rolesRepositories";

/**
 * @class RolesController
 * @description Controlador para gestionar las operaciones CRUD de los roles.
 */
class RolesController {
  private rolesRepository: RolesRepository;
  private rolesService: RolesService;

  constructor() {
    this.rolesRepository = new RolesRepository();
    this.rolesService = new RolesService(this.rolesRepository);
  }

  /**
   * @method getAll
   * @description Obtiene una lista de todos los roles.
   */
  public getAll: RequestHandler = async (req, res) => {
    const roles = await this.rolesService.findRoles(req.query);
    res.status(200).json(roles);
  };

  /**
   * @method getById
   * @description Obtiene un rol por su ID.
   */
  public getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const role = await this.rolesService.findRolesById(id);
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(role);
  };

  /**
   * @method create
   * @description Crea un nuevo rol.
   */
  public create: RequestHandler = async (req, res) => {
    const newRole = await this.rolesService.createRoles(req.body);
    res.status(201).json(newRole);
  };

  /**
   * @method update
   * @description Actualiza un rol existente por su ID.
   */
  public update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updatedRole = await this.rolesService.updateRoles(id, req.body);
    if (!updatedRole) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(updatedRole);
  };

  /**
   * @method delete
   * @description Elimina un rol por su ID.
   */
  public delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const success = await this.rolesService.deleteRoles(id);
    if (!success) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(204).send();
  };
}

export default new RolesController();
