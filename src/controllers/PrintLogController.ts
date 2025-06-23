import { Request, Response, RequestHandler } from "express";
import printLogService from "../services/PrintLogService";
import { User } from "types/UsersTypes";

/**
 * @class PrintLogController
 * @description Controlador para gestionar el registro de impresiones de credenciales.
 */
class PrintLogController {
  /**
   * @method create
   * @description Maneja la solicitud para registrar una nueva impresión para una credencial.
   * @param {Request} req - La solicitud HTTP. Espera `id` en params y `location` en body.
   * @param {Response} res - La respuesta HTTP.
   */
  public create: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { location } = req.body;

    const user = req.currentUser as User;

    if (!location) {
      res
        .status(400)
        .json({ message: "Location is required to log a print event." });
      return;
    }
    if (!user) {
      res.status(401).json({ message: "User not authenticated." });
      return;
    }

    const updatedCredential = await printLogService.addPrintLog(
      id,
      user,
      location
    );

    if (!updatedCredential) {
      res.status(404).json({ message: "Credential not found." });
      return;
    }

    res.status(200).json({
      message: "Print logged successfully.",
      credential: updatedCredential,
    });
  };
}

export default new PrintLogController();
