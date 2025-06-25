import { Request, Response, RequestHandler } from "express";
import auditService from "@services/auditService";

/**
 * @class AuditController
 * @description Controlador para gestionar los logs de auditoría.
 */
class AuditController {
  /**
   * @method getLogs
   * @description Obtiene logs de auditoría con filtros opcionales.
   */
  public getLogs: RequestHandler = async (req, res) => {
    try {
      const logs = await auditService.getLogs(req.query);
      res.status(200).json(logs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los logs de auditoría" });
    }
  };

  /**
   * @method getById
   * @description Obtiene un log de auditoría por su ID.
   */
  public getById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const log = await auditService.getById(id);
      if (!log) {
        res.status(404).json({ message: "Log de auditoría no encontrado" });
        return;
      }
      res.status(200).json(log);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el log de auditoría" });
    }
  };

  /**
   * @method getByUserId
   * @description Obtiene logs de auditoría de un usuario específico.
   */
  public getByUserId: RequestHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      const logs = await auditService.getByUserId(userId, req.query);
      res.status(200).json(logs);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener los logs de auditoría del usuario",
        });
    }
  };

  /**
   * @method getByCategory
   * @description Obtiene logs de auditoría por categoría.
   */
  public getByCategory: RequestHandler = async (req, res) => {
    try {
      const { category } = req.params;
      const logs = await auditService.getByCategory(category, req.query);
      res.status(200).json(logs);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener los logs de auditoría por categoría",
        });
    }
  };

  /**
   * @method getByDateRange
   * @description Obtiene logs de auditoría en un rango de fechas.
   */
  public getByDateRange: RequestHandler = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        res
          .status(400)
          .json({ message: "Se requieren fechas de inicio y fin" });
        return;
      }
      const logs = await auditService.getByDateRange(
        new Date(startDate as string),
        new Date(endDate as string),
        req.query
      );
      res.status(200).json(logs);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener los logs de auditoría por rango de fechas",
        });
    }
  };

  /**
   * @method getStats
   * @description Obtiene estadísticas de los logs de auditoría.
   */
  public getStats: RequestHandler = async (req, res) => {
    try {
      const stats = await auditService.getStats(req.query);
      res.status(200).json(stats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las estadísticas de auditoría" });
    }
  };

  /**
   * @method deleteOldLogs
   * @description Elimina logs de auditoría antiguos.
   */
  public deleteOldLogs: RequestHandler = async (req, res) => {
    try {
      const { daysOld } = req.params;
      const deletedCount = await auditService.deleteOldLogs(parseInt(daysOld));
      res.status(200).json({ deletedCount });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar logs antiguos" });
    }
  };
}

export default new AuditController();
