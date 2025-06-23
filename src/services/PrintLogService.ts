import credentialRepositories from "../repositories/credentialRepositories";
import { ICredential, IPrintLog } from "../types/CredentialTypes";
import { User } from "../types/UsersTypes";

/**
 * @class PrintLogService
 * @description Contiene la lógica de negocio para gestionar los registros de impresión.
 */
class PrintLogService {
  /**
   * @method addPrintLog
   * @description Añade un nuevo registro de impresión a una credencial existente.
   * @param {string} credentialId - El ID de la credencial que se está imprimiendo.
   * @param {Partial<User>}- El usuario que realiza la impresión.
   * @param {string} location - El lugar o la razón de la impresión.
   * @returns {Promise<ICredential | null>} La credencial actualizada con el nuevo log.
   */
  public async addPrintLog(
    credentialId: string,
    user: User,
    location: string
  ): Promise<ICredential | null> {
    const credential = await credentialRepositories.findById(credentialId);
    if (!credential) {
      throw new Error("Credential not found");
    }

    const newLog: IPrintLog = {
      printedAt: new Date(),
      printedBy: user._id,
      location: location,
    };

    credential.printLogs.push(newLog);

    return credentialRepositories.update(credentialId, {
      printLogs: credential.printLogs,
    });
  }
}

export default new PrintLogService();
