import { Request, Response, RequestHandler } from "express";
import systemSettingsService from "@services/systemSettingsService";

/**
 * @class SystemSettingsController
 * @description Controlador para gestionar la configuración del sistema.
 */
class SystemSettingsController {
  /**
   * @method get
   * @description Obtiene la configuración actual del sistema.
   */
  public get: RequestHandler = async (req, res) => {
    try {
      const settings = await systemSettingsService.get();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la configuración del sistema" });
    }
  };

  /**
   * @method update
   * @description Actualiza la configuración del sistema.
   */
  public update: RequestHandler = async (req, res) => {
    try {
      const updatedSettings = await systemSettingsService.update(req.body);
      res.status(200).json(updatedSettings);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la configuración del sistema" });
    }
  };

  /**
   * @method reset
   * @description Restablece la configuración del sistema a los valores por defecto.
   */
  public reset: RequestHandler = async (req, res) => {
    try {
      const settings = await systemSettingsService.reset();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al restablecer la configuración del sistema" });
    }
  };
}

export default new SystemSettingsController(); 