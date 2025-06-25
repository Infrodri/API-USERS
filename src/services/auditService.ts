import auditLogRepository from "@repositories/auditLogRepositories";
import { IAuditLog } from "@models/AuditLog";

/**
 * @class AuditService
 * @description Contiene la lógica de negocio para los logs de auditoría.
 */
class AuditService {
  /**
   * @method create
   * @description Crea un nuevo log de auditoría.
   * @param {IAuditLog} data - Los datos del log de auditoría.
   * @returns {Promise<IAuditLog>} El log de auditoría creado.
   */
  public async create(data: IAuditLog): Promise<IAuditLog> {
    return await auditLogRepository.create(data);
  }

  /**
   * @method getLogs
   * @description Obtiene logs de auditoría con filtros opcionales.
   * @param {any} query - Filtros para la consulta.
   * @returns {Promise<IAuditLog[]>} Los logs de auditoría.
   */
  public async getLogs(query: any = {}): Promise<IAuditLog[]> {
    return await auditLogRepository.find(query);
  }

  /**
   * @method getById
   * @description Obtiene un log de auditoría por su ID.
   * @param {string} id - El ID del log de auditoría.
   * @returns {Promise<IAuditLog | null>} El log de auditoría encontrado.
   */
  public async getById(id: string): Promise<IAuditLog | null> {
    return await auditLogRepository.findById(id);
  }

  /**
   * @method getByUserId
   * @description Obtiene logs de auditoría de un usuario específico.
   * @param {string} userId - El ID del usuario.
   * @param {any} query - Filtros adicionales.
   * @returns {Promise<IAuditLog[]>} Los logs de auditoría del usuario.
   */
  public async getByUserId(
    userId: string,
    query: any = {}
  ): Promise<IAuditLog[]> {
    return await auditLogRepository.findByUserId(userId, query);
  }

  /**
   * @method getByCategory
   * @description Obtiene logs de auditoría por categoría.
   * @param {string} category - La categoría de los logs.
   * @param {any} query - Filtros adicionales.
   * @returns {Promise<IAuditLog[]>} Los logs de auditoría de la categoría.
   */
  public async getByCategory(
    category: string,
    query: any = {}
  ): Promise<IAuditLog[]> {
    return await auditLogRepository.findByCategory(category, query);
  }

  /**
   * @method getByDateRange
   * @description Obtiene logs de auditoría en un rango de fechas.
   * @param {Date} startDate - Fecha de inicio.
   * @param {Date} endDate - Fecha de fin.
   * @param {any} query - Filtros adicionales.
   * @returns {Promise<IAuditLog[]>} Los logs de auditoría en el rango.
   */
  public async getByDateRange(
    startDate: Date,
    endDate: Date,
    query: any = {}
  ): Promise<IAuditLog[]> {
    return await auditLogRepository.findByDateRange(startDate, endDate, query);
  }

  /**
   * @method getStats
   * @description Obtiene estadísticas de los logs de auditoría.
   * @param {any} query - Filtros para las estadísticas.
   * @returns {Promise<any>} Las estadísticas de auditoría.
   */
  public async getStats(query: any = {}): Promise<any> {
    return await auditLogRepository.getStats(query);
  }

  /**
   * @method deleteOldLogs
   * @description Elimina logs de auditoría antiguos.
   * @param {number} daysOld - Número de días para considerar un log como antiguo.
   * @returns {Promise<number>} Número de logs eliminados.
   */
  public async deleteOldLogs(daysOld: number): Promise<number> {
    return await auditLogRepository.deleteOldLogs(daysOld);
  }
}

export default new AuditService();
