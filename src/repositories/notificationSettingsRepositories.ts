import NotificationSettingsModel, {
  INotificationSettings,
} from "@models/NotificationSettings";

export class NotificationSettingsRepository {
  async get(): Promise<INotificationSettings | null> {
    // Obtener la primera configuración de notificaciones (solo debe haber una)
    let settings = await NotificationSettingsModel.findOne().exec();

    // Si no existe, crear una configuración por defecto
    if (!settings) {
      settings = new NotificationSettingsModel();
      await settings.save();
    }

    return settings;
  }

  async update(
    data: Partial<INotificationSettings>
  ): Promise<INotificationSettings | null> {
    // Obtener la configuración existente
    let settings = await NotificationSettingsModel.findOne().exec();

    if (!settings) {
      // Si no existe, crear una nueva
      settings = new NotificationSettingsModel(data);
    } else {
      // Si existe, actualizar
      Object.assign(settings, data);
    }

    return await settings.save();
  }

  async reset(): Promise<INotificationSettings> {
    // Eliminar configuración existente y crear una nueva por defecto
    await NotificationSettingsModel.deleteMany({}).exec();
    const settings = new NotificationSettingsModel();
    return await settings.save();
  }
}

export default new NotificationSettingsRepository();
