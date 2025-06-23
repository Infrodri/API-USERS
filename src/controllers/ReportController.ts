import { Request, Response, RequestHandler } from "express";
import reportService from "../services/ReportService";

/**
 * @class ReportController
 * @description Controlador para manejar las solicitudes de generación de reportes.
 */
class ReportController {
  /**
   * @method getHistoryByCI
   * @description Maneja la solicitud para obtener el historial de una credencial por C.I.
   * @param {Request} req - La solicitud HTTP. Espera el `ci` en los parámetros de la ruta.
   * @param {Response} res - La respuesta HTTP.
   */
  public getHistoryByCI: RequestHandler = async (req, res) => {
    const { ci } = req.params;
    const credentialHistory = await reportService.getCredentialHistoryByCI(ci);

    if (!credentialHistory) {
      res
        .status(404)
        .json({ message: `No credential history found for CI: ${ci}` });
      return;
    }

    res.status(200).json(credentialHistory);
  };

  /**
   * @method getPrintsByDate
   * @description Maneja la solicitud para obtener el número de impresiones por rango de fechas.
   * @param {Request} req - La solicitud HTTP. Espera `startDate` y `endDate` en la query.
   * @param {Response} res - La respuesta HTTP.
   */
  public getPrintsByDate: RequestHandler = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({
        message: "Both startDate and endDate are required in query parameters.",
      });
      return;
    }

    try {
      const printCount = await reportService.getPrintCountByDate(
        startDate as string,
        endDate as string
      );

      res.status(200).json({
        startDate,
        endDate,
        printCount,
      });
    } catch (error) {
      res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD format.",
      });
    }
  };
}

export default new ReportController();
