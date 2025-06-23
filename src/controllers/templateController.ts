import { Request, Response, RequestHandler } from "express";
import templateService from "@services/templateService";

/**
 * @class TemplateController
 * @description Controlador para gestionar las operaciones CRUD de las plantillas de credenciales.
 */
class TemplateController {
  public getAll: RequestHandler = async (req, res) => {
    const templates = await templateService.getAllTemplates(req.query);
    res.status(200).json(templates);
  };

  public getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const template = await templateService.getTemplateById(id);
    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    res.status(200).json(template);
  };

  public create: RequestHandler = async (req, res) => {
    const newTemplate = await templateService.createTemplate(req.body);
    res.status(201).json(newTemplate);
  };

  public update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updatedTemplate = await templateService.updateTemplate(id, req.body);
    if (!updatedTemplate) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    res.status(200).json(updatedTemplate);
  };

  public delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const success = await templateService.deleteTemplate(id);
    if (!success) {
      res.status(404).json({ message: "Template not found" });
      return;
    }
    res.status(204).send();
  };
}

export default new TemplateController();
