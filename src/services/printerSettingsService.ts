import printerSettingsRepository from "@repositories/printerSettingsRepositories";
import { IPrinterSettings } from "@models/PrinterSettings";

/**
 * @class PrinterSettingsService
 * @description Contiene la lógica de negocio para la configuración de impresoras.
 */
class PrinterSettingsService {
  /**
   * @method get
   * @description Obtiene la configuración actual de impresoras.
   * @returns {Promise<IPrinterSettings>} La configuración de impresoras.
   */
  public async get(): Promise<IPrinterSettings> {
    const settings = await printerSettingsRepository.get();
    if (!settings) {
      throw new Error("No se pudo obtener la configuración de impresoras");
    }
    return settings;
  }

  /**
   * @method update
   * @description Actualiza la configuración de impresoras.
   * @param {Partial<IPrinterSettings>} data - Los datos a actualizar.
   * @returns {Promise<IPrinterSettings>} La configuración actualizada.
   */
  public async update(
    data: Partial<IPrinterSettings>
  ): Promise<IPrinterSettings> {
    const settings = await printerSettingsRepository.update(data);
    if (!settings) {
      throw new Error("No se pudo actualizar la configuración de impresoras");
    }
    return settings;
  }

  /**
   * @method reset
   * @description Restablece la configuración de impresoras a los valores por defecto.
   * @returns {Promise<IPrinterSettings>} La configuración restablecida.
   */
  public async reset(): Promise<IPrinterSettings> {
    return await printerSettingsRepository.reset();
  }
}

export default new PrinterSettingsService();
