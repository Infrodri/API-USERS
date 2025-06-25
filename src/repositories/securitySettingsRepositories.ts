import SecuritySettingsModel, { ISecuritySettings } from "@models/SecuritySettings";

export class SecuritySettingsRepository {
  async get(): Promise<ISecuritySettings | null> {
    // Obtener la primera configuración de seguridad (solo debe haber una)
    let settings = await SecuritySettingsModel.findOne().exec();
    
    // Si no existe, crear una configuración por defecto
    if (!settings) {
      settings = new SecuritySettingsModel();
      await settings.save();
    }
    
    return settings;
  }

  async update(data: Partial<ISecuritySettings>): Promise<ISecuritySettings | null> {
    // Obtener la configuración existente
    let settings = await SecuritySettingsModel.findOne().exec();
    
    if (!settings) {
      // Si no existe, crear una nueva
      settings = new SecuritySettingsModel(data);
    } else {
      // Si existe, actualizar
      Object.assign(settings, data);
    }
    
    return await settings.save();
  }

  async reset(): Promise<ISecuritySettings> {
    // Eliminar configuración existente y crear una nueva por defecto
    await SecuritySettingsModel.deleteMany({}).exec();
    const settings = new SecuritySettingsModel();
    return await settings.save();
  }
}

export default new SecuritySettingsRepository(); 