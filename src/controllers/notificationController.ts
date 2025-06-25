import { Request, Response, RequestHandler } from "express";
import notificationService from "@services/notificationService";

/**
 * @class NotificationController
 * @description Controlador para gestionar las notificaciones.
 */
class NotificationController {
  /**
   * @method getByUserId
   * @description Obtiene las notificaciones de un usuario.
   */
  public getByUserId: RequestHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await notificationService.getByUserId(
        userId,
        req.query
      );
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las notificaciones" });
    }
  };

  /**
   * @method getById
   * @description Obtiene una notificación por su ID.
   */
  public getById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await notificationService.getById(id);
      if (!notification) {
        res.status(404).json({ message: "Notificación no encontrada" });
        return;
      }
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la notificación" });
    }
  };

  /**
   * @method create
   * @description Crea una nueva notificación.
   */
  public create: RequestHandler = async (req, res) => {
    try {
      const notification = await notificationService.create(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la notificación" });
    }
  };

  /**
   * @method markAsRead
   * @description Marca una notificación como leída.
   */
  public markAsRead: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await notificationService.markAsRead(id);
      if (!notification) {
        res.status(404).json({ message: "Notificación no encontrada" });
        return;
      }
      res.status(200).json(notification);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al marcar la notificación como leída" });
    }
  };

  /**
   * @method markAllAsRead
   * @description Marca todas las notificaciones de un usuario como leídas.
   */
  public markAllAsRead: RequestHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      const success = await notificationService.markAllAsRead(userId);
      res.status(200).json({ success });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al marcar las notificaciones como leídas" });
    }
  };

  /**
   * @method getUnreadCount
   * @description Obtiene el número de notificaciones no leídas de un usuario.
   */
  public getUnreadCount: RequestHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      const count = await notificationService.getUnreadCount(userId);
      res.status(200).json({ count });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el conteo de notificaciones" });
    }
  };

  /**
   * @method delete
   * @description Elimina una notificación.
   */
  public delete: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const success = await notificationService.delete(id);
      if (!success) {
        res.status(404).json({ message: "Notificación no encontrada" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la notificación" });
    }
  };

  /**
   * @method deleteByUserId
   * @description Elimina todas las notificaciones de un usuario.
   */
  public deleteByUserId: RequestHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      const success = await notificationService.deleteByUserId(userId);
      res.status(200).json({ success });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar las notificaciones" });
    }
  };
}

export default new NotificationController();
