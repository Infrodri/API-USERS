import Credential from "../models/Credential";
import { ICredential } from "../types/CredentialTypes";
import { Repository, Query } from "../types/RepositoryTypes";

class CredentialRepository implements Repository<ICredential> {
  public async find(query?: Query): Promise<ICredential[]> {
    return Credential.find({ ...query })
      .populate("template")
      .populate("printLogs.printedBy", "name email");
  }

  public async findById(id: string): Promise<ICredential | null> {
    return Credential.findById(id)
      .populate("template")
      .populate("printLogs.printedBy", "name email");
  }

  /**
   * @method findByCI
   * @description Busca una credencial por el número de Cédula de Identidad.
   * @param {string} ci - El C.I. a buscar.
   * @returns {Promise<ICredential | null>} La credencial encontrada o null.
   */
  public async findByCI(ci: string): Promise<ICredential | null> {
    return Credential.findOne({ ci: ci }).populate("template");
  }

  /**
   * @method countPrintsByDateRange
   * @description Cuenta el número de impresiones realizadas en un rango de fechas.
   * @param {Date} startDate - La fecha de inicio del rango.
   * @param {Date} endDate - La fecha de fin del rango.
   * @returns {Promise<number>} El número total de impresiones.
   */
  public async countPrintsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const result = await Credential.aggregate([
      // Paso 1: Desenrrollar el array de printLogs
      { $unwind: "$printLogs" },
      // Paso 2: Filtrar los logs por rango de fecha
      {
        $match: {
          "printLogs.printedAt": {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      // Paso 3: Contar el número de documentos resultantes
      { $count: "totalPrints" },
    ]);

    // El resultado de la agregación es un array, si hay resultados, tomamos el total.
    return result.length > 0 ? result[0].totalPrints : 0;
  }

  public async findByQrCode(qrCode: string): Promise<ICredential | null> {
    return Credential.findOne({ qr_code_url: qrCode })
      .populate("template")
      .populate("printLogs.printedBy", "name email");
  }

  public async create(data: Partial<ICredential>): Promise<ICredential> {
    const credential = await Credential.create(data);
    return credential.populate("template");
  }

  public async update(
    id: string,
    data: Partial<ICredential>
  ): Promise<ICredential | null> {
    return Credential.findByIdAndUpdate(id, data, { new: true })
      .populate("template")
      .populate("printLogs.printedBy", "name email");
  }

  public async delete(id: string): Promise<boolean> {
    // En lugar de borrar, se cambia el status a 'revoked' o 'inactive'
    const result = await Credential.findByIdAndUpdate(id, {
      status: "revoked",
    });
    return !!result;
  }
}

export default new CredentialRepository();
