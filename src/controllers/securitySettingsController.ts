import { Request, Response, RequestHandler } from "express";
import securitySettingsService from "@services/securitySettingsService";

/**
 * @class SecuritySettingsController
 * @description Controlador para gestionar la configuración de seguridad.
 */
class SecuritySettingsController {
  /**
   * @method get
   * @description Obtiene la configuración actual de seguridad.
   */
  public get: RequestHandler = async (req, res) => {
    try {
      const settings = await securitySettingsService.get();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la configuración de seguridad" });
    }
  };

  /**
   * @method update
   * @description Actualiza la configuración de seguridad.
   */
  public update: RequestHandler = async (req, res) => {
    try {
      const updatedSettings = await securitySettingsService.update(req.body);
      res.status(200).json(updatedSettings);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la configuración de seguridad" });
    }
  };

  /**
   * @method reset
   * @description Restablece la configuración de seguridad a los valores por defecto.
   */
  public reset: RequestHandler = async (req, res) => {
    try {
      const settings = await securitySettingsService.reset();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al restablecer la configuración de seguridad" });
    }
  };
}

export default new SecuritySettingsController(); 