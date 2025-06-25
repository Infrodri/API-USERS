import SystemSettingsModel, { ISystemSettings } from "@models/SystemSettings";

export class SystemSettingsRepository {
  async get(): Promise<ISystemSettings | null> {
    // Obtener la primera configuración del sistema (solo debe haber una)
    let settings = await SystemSettingsModel.findOne().exec();

    // Si no existe, crear una configuración por defecto
    if (!settings) {
      settings = new SystemSettingsModel();
      await settings.save();
    }

    return settings;
  }

  async update(
    data: Partial<ISystemSettings>
  ): Promise<ISystemSettings | null> {
    // Obtener la configuración existente
    let settings = await SystemSettingsModel.findOne().exec();

    if (!settings) {
      // Si no existe, crear una nueva
      settings = new SystemSettingsModel(data);
    } else {
      // Si existe, actualizar
      Object.assign(settings, data);
    }

    return await settings.save();
  }

  async reset(): Promise<ISystemSettings> {
    // Eliminar configuración existente y crear una nueva por defecto
    await SystemSettingsModel.deleteMany({}).exec();
    const settings = new SystemSettingsModel();
    return await settings.save();
  }
}

export default new SystemSettingsRepository();
