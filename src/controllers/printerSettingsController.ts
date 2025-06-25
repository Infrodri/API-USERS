import { Request, Response, RequestHandler } from "express";
import printerSettingsService from "@services/printerSettingsService";

/**
 * @class PrinterSettingsController
 * @description Controlador para gestionar la configuración de impresoras.
 */
class PrinterSettingsController {
  /**
   * @method get
   * @description Obtiene la configuración actual de impresoras.
   */
  public get: RequestHandler = async (req, res) => {
    try {
      const settings = await printerSettingsService.get();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la configuración de impresoras" });
    }
  };

  /**
   * @method update
   * @description Actualiza la configuración de impresoras.
   */
  public update: RequestHandler = async (req, res) => {
    try {
      const updatedSettings = await printerSettingsService.update(req.body);
      res.status(200).json(updatedSettings);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la configuración de impresoras" });
    }
  };

  /**
   * @method reset
   * @description Restablece la configuración de impresoras a los valores por defecto.
   */
  public reset: RequestHandler = async (req, res) => {
    try {
      const settings = await printerSettingsService.reset();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Error al restablecer la configuración de impresoras" });
    }
  };
}

export default new PrinterSettingsController(); 