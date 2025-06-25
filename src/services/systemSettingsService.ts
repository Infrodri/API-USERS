import systemSettingsRepository from "@repositories/systemSettingsRepositories";
import { ISystemSettings } from "@models/SystemSettings";

/**
 * @class SystemSettingsService
 * @description Contiene la lógica de negocio para la configuración del sistema.
 */
class SystemSettingsService {
  /**
   * @method get
   * @description Obtiene la configuración actual del sistema.
   * @returns {Promise<ISystemSettings>} La configuración del sistema.
   */
  public async get(): Promise<ISystemSettings> {
    const settings = await systemSettingsRepository.get();
    if (!settings) {
      throw new Error("No se pudo obtener la configuración del sistema");
    }
    return settings;
  }

  /**
   * @method update
   * @description Actualiza la configuración del sistema.
   * @param {Partial<ISystemSettings>} data - Los datos a actualizar.
   * @returns {Promise<ISystemSettings>} La configuración actualizada.
   */
  public async update(
    data: Partial<ISystemSettings>
  ): Promise<ISystemSettings> {
    const settings = await systemSettingsRepository.update(data);
    if (!settings) {
      throw new Error("No se pudo actualizar la configuración del sistema");
    }
    return settings;
  }

  /**
   * @method reset
   * @description Restablece la configuración del sistema a los valores por defecto.
   * @returns {Promise<ISystemSettings>} La configuración restablecida.
   */
  public async reset(): Promise<ISystemSettings> {
    return await systemSettingsRepository.reset();
  }
}

export default new SystemSettingsService();
