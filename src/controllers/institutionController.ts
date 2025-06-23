import { Request, Response, RequestHandler } from "express";
import institutionService from "../services/institutionService";

/**
 * @class InstitutionController
 * @description Controlador para gestionar las operaciones CRUD de las instituciones.
 */
class InstitutionController {
  public getAll: RequestHandler = async (req, res) => {
    const institutions = await institutionService.getInstitutions(req.query);
    res.status(200).json(institutions);
  };

  public getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const institution = await institutionService.getInstitutionById(id);
    if (!institution) {
      res.status(404).json({ message: "Institution not found" });
      return;
    }
    res.status(200).json(institution);
  };

  public create: RequestHandler = async (req, res) => {
    const newInstitution = await institutionService.createInstitution(req.body);
    res.status(201).json(newInstitution);
  };

  public update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updatedInstitution = await institutionService.updateInstitution(
      id,
      req.body
    );
    if (!updatedInstitution) {
      res.status(404).json({ message: "Institution not found" });
      return;
    }
    res.status(200).json(updatedInstitution);
  };

  public delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const success = await institutionService.deleteInstitution(id);
    if (!success) {
      res
        .status(404)
        .json({ message: "Institution not found or already deleted" });
      return;
    }
    res.status(204).send();
  };
}

export default new InstitutionController();
