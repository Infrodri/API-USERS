import securitySettingsRepository from "@repositories/securitySettingsRepositories";
import { ISecuritySettings } from "@models/SecuritySettings";

/**
 * @class SecuritySettingsService
 * @description Contiene la lógica de negocio para la configuración de seguridad.
 */
class SecuritySettingsService {
  /**
   * @method get
   * @description Obtiene la configuración actual de seguridad.
   * @returns {Promise<ISecuritySettings>} La configuración de seguridad.
   */
  public async get(): Promise<ISecuritySettings> {
    const settings = await securitySettingsRepository.get();
    if (!settings) {
      throw new Error("No se pudo obtener la configuración de seguridad");
    }
    return settings;
  }

  /**
   * @method update
   * @description Actualiza la configuración de seguridad.
   * @param {Partial<ISecuritySettings>} data - Los datos a actualizar.
   * @returns {Promise<ISecuritySettings>} La configuración actualizada.
   */
  public async update(
    data: Partial<ISecuritySettings>
  ): Promise<ISecuritySettings> {
    const settings = await securitySettingsRepository.update(data);
    if (!settings) {
      throw new Error("No se pudo actualizar la configuración de seguridad");
    }
    return settings;
  }

  /**
   * @method reset
   * @description Restablece la configuración de seguridad a los valores por defecto.
   * @returns {Promise<ISecuritySettings>} La configuración restablecida.
   */
  public async reset(): Promise<ISecuritySettings> {
    return await securitySettingsRepository.reset();
  }
}

export default new SecuritySettingsService();
