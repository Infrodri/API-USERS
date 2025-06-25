import { Request, Response, RequestHandler } from "express";
import notificationSettingsService from "@services/notificationSettingsService";

/**
 * @class NotificationSettingsController
 * @description Controlador para gestionar la configuración de notificaciones.
 */
class NotificationSettingsController {
  /**
   * @method get
   * @description Obtiene la configuración actual de notificaciones.
   */
  public get: RequestHandler = async (req, res) => {
    try {
      const settings = await notificationSettingsService.get();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la configuración de notificaciones" });
    }
  };

  /**
   * @method update
   * @description Actualiza la configuración de notificaciones.
   */
  public update: RequestHandler = async (req, res) => {
    try {
      const updatedSettings = await notificationSettingsService.update(req.body);
      res.status(200).json(updatedSettings);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la configuración de notificaciones" });
    }
  };

  /**
   * @method reset
   * @description Restablece la configuración de notificaciones a los valores por defecto.
   */
  public reset: RequestHandler = async (req, res) => {
    try {
      const settings = await notificationSettingsService.reset();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al restablecer la configuración de notificaciones" });
    }
  };
}

export default new NotificationSettingsController(); 