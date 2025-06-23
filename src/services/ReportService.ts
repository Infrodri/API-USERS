import credentialRepositories from "../repositories/credentialRepositories";
import { ICredential } from "../types/CredentialTypes";

/**
 * @class ReportService
 * @description Contiene la lógica de negocio para generar reportes.
 */
class ReportService {
  /**
   * @method getCredentialHistoryByCI
   * @description Obtiene el historial completo de una credencial buscando por C.I.
   * @param {string} ci - El Cédula de Identidad del funcionario.
   * @returns {Promise<ICredential | null>} La credencial con todo su historial o null si no se encuentra.
   */
  public async getCredentialHistoryByCI(
    ci: string
  ): Promise<ICredential | null> {
    return credentialRepositories.findByCI(ci);
  }

  /**
   * @method getPrintCountByDate
   * @description Valida las fechas y obtiene el conteo de impresiones en ese rango.
   * @param {string} startDateStr - La fecha de inicio en formato string (ej. 'YYYY-MM-DD').
   * @param {string} endDateStr - La fecha de fin en formato string.
   * @returns {Promise<number>} El número total de impresiones.
   */
  public async getPrintCountByDate(
    startDateStr: string,
    endDateStr: string
  ): Promise<number> {
    if (!startDateStr || !endDateStr) {
      throw new Error("Start date and end date are required.");
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Ajustamos la hora de endDate para que incluya todo el día
    endDate.setHours(23, 59, 59, 999);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format. Please use YYYY-MM-DD.");
    }

    return credentialRepositories.countPrintsByDateRange(startDate, endDate);
  }
}

export default new ReportService();
