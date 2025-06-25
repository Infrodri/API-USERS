import PrinterSettingsModel, {
  IPrinterSettings,
} from "@models/PrinterSettings";

export class PrinterSettingsRepository {
  async get(): Promise<IPrinterSettings | null> {
    // Obtener la primera configuración de impresoras (solo debe haber una)
    let settings = await PrinterSettingsModel.findOne().exec();

    // Si no existe, crear una configuración por defecto
    if (!settings) {
      settings = new PrinterSettingsModel();
      await settings.save();
    }

    return settings;
  }

  async update(
    data: Partial<IPrinterSettings>
  ): Promise<IPrinterSettings | null> {
    // Obtener la configuración existente
    let settings = await PrinterSettingsModel.findOne().exec();

    if (!settings) {
      // Si no existe, crear una nueva
      settings = new PrinterSettingsModel(data);
    } else {
      // Si existe, actualizar
      Object.assign(settings, data);
    }

    return await settings.save();
  }

  async reset(): Promise<IPrinterSettings> {
    // Eliminar configuración existente y crear una nueva por defecto
    await PrinterSettingsModel.deleteMany({}).exec();
    const settings = new PrinterSettingsModel();
    return await settings.save();
  }
}

export default new PrinterSettingsRepository();
