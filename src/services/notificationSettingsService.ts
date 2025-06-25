import notificationSettingsRepository from "@repositories/notificationSettingsRepositories";
import { INotificationSettings } from "@models/NotificationSettings";

/**
 * @class NotificationSettingsService
 * @description Contiene la lógica de negocio para la configuración de notificaciones.
 */
class NotificationSettingsService {
  /**
   * @method get
   * @description Obtiene la configuración actual de notificaciones.
   * @returns {Promise<INotificationSettings>} La configuración de notificaciones.
   */
  public async get(): Promise<INotificationSettings> {
    const settings = await notificationSettingsRepository.get();
    if (!settings) {
      throw new Error("No se pudo obtener la configuración de notificaciones");
    }
    return settings;
  }

  /**
   * @method update
   * @description Actualiza la configuración de notificaciones.
   * @param {Partial<INotificationSettings>} data - Los datos a actualizar.
   * @returns {Promise<INotificationSettings>} La configuración actualizada.
   */
  public async update(data: Partial<INotificationSettings>): Promise<INotificationSettings> {
    const settings = await notificationSettingsRepository.update(data);
    if (!settings) {
      throw new Error("No se pudo actualizar la configuración de notificaciones");
    }
    return settings;
  }

  /**
   * @method reset
   * @description Restablece la configuración de notificaciones a los valores por defecto.
   * @returns {Promise<INotificationSettings>} La configuración restablecida.
   */
  public async reset(): Promise<INotificationSettings> {
    return await notificationSettingsRepository.reset();
  }
}

export default new NotificationSettingsService(); 