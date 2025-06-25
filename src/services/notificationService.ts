import notificationRepository from "@repositories/notificationRepositories";
import { INotification } from "@models/Notification";

/**
 * @class NotificationService
 * @description Contiene la lógica de negocio para las notificaciones.
 */
class NotificationService {
  /**
   * @method create
   * @description Crea una nueva notificación.
   * @param {INotification} data - Los datos de la notificación.
   * @returns {Promise<INotification>} La notificación creada.
   */
  public async create(data: INotification): Promise<INotification> {
    return await notificationRepository.create(data);
  }

  /**
   * @method getByUserId
   * @description Obtiene las notificaciones de un usuario.
   * @param {string} userId - El ID del usuario.
   * @param {any} query - Filtros adicionales.
   * @returns {Promise<INotification[]>} Las notificaciones del usuario.
   */
  public async getByUserId(
    userId: string,
    query: any = {}
  ): Promise<INotification[]> {
    return await notificationRepository.findByUserId(userId, query);
  }

  /**
   * @method getById
   * @description Obtiene una notificación por su ID.
   * @param {string} id - El ID de la notificación.
   * @returns {Promise<INotification | null>} La notificación encontrada.
   */
  public async getById(id: string): Promise<INotification | null> {
    return await notificationRepository.findById(id);
  }

  /**
   * @method markAsRead
   * @description Marca una notificación como leída.
   * @param {string} id - El ID de la notificación.
   * @returns {Promise<INotification | null>} La notificación actualizada.
   */
  public async markAsRead(id: string): Promise<INotification | null> {
    return await notificationRepository.markAsRead(id);
  }

  /**
   * @method markAllAsRead
   * @description Marca todas las notificaciones de un usuario como leídas.
   * @param {string} userId - El ID del usuario.
   * @returns {Promise<boolean>} True si se actualizaron notificaciones.
   */
  public async markAllAsRead(userId: string): Promise<boolean> {
    return await notificationRepository.markAllAsRead(userId);
  }

  /**
   * @method getUnreadCount
   * @description Obtiene el número de notificaciones no leídas de un usuario.
   * @param {string} userId - El ID del usuario.
   * @returns {Promise<number>} El número de notificaciones no leídas.
   */
  public async getUnreadCount(userId: string): Promise<number> {
    return await notificationRepository.getUnreadCount(userId);
  }

  /**
   * @method delete
   * @description Elimina una notificación.
   * @param {string} id - El ID de la notificación.
   * @returns {Promise<boolean>} True si se eliminó la notificación.
   */
  public async delete(id: string): Promise<boolean> {
    return await notificationRepository.delete(id);
  }

  /**
   * @method deleteByUserId
   * @description Elimina todas las notificaciones de un usuario.
   * @param {string} userId - El ID del usuario.
   * @returns {Promise<boolean>} True si se eliminaron notificaciones.
   */
  public async deleteByUserId(userId: string): Promise<boolean> {
    return await notificationRepository.deleteByUserId(userId);
  }
}

export default new NotificationService();
