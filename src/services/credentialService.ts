import QRCode from "qrcode";
import credentialRepositories from "../repositories/credentialRepositories";
import { ICredential, CredentialStatus } from "../types/CredentialTypes";
import { Query } from "../types/RepositoryTypes";

class CredentialService {
  public async getCredentials(query?: Query): Promise<ICredential[]> {
    return credentialRepositories.find(query);
  }

  public async getCredentialById(id: string): Promise<ICredential | null> {
    return credentialRepositories.findById(id);
  }

  public async verifyCredentialByQr(qrCode: string) {
    const credential = await credentialRepositories.findByQrCode(qrCode);

    if (!credential) {
      return { valid: false, message: "Credential not found" };
    }

    // Aquí se puede agregar lógica de negocio (ej. verificar si ha expirado)
    if (credential.status !== CredentialStatus.ACTIVE) {
      return {
        valid: false,
        message: `Credential is ${credential.status}`,
        status: credential.status,
      };
    }

    return { valid: true, credential };
  }

  public async createCredential(
    data: Partial<ICredential>
  ): Promise<ICredential> {
    // 1. Crear la credencial sin el QR para obtener el ID
    const tempCredential = await credentialRepositories.create({
      ...data,
      qr_code_url: "temp",
    });

    // 2. Generar el QR code usando el ID
    // En un escenario real, esta sería una URL pública apuntando al endpoint de verificación
    const qrData = `https://your-domain.com/verify/${tempCredential._id}`;
    const qrCodeImage = await QRCode.toDataURL(qrData);

    // 3. Actualizar la credencial con el QR code
    const finalCredential = await credentialRepositories.update(
      String(tempCredential._id),
      { qr_code_url: qrCodeImage }
    );

    if (!finalCredential) {
      // Manejar el caso de que la actualización falle (aunque es improbable)
      throw new Error("Failed to update credential with QR code");
    }

    return finalCredential;
  }

  public async updateCredential(
    id: string,
    data: Partial<ICredential>
  ): Promise<ICredential | null> {
    return credentialRepositories.update(id, data);
  }

  public async deleteCredential(id: string): Promise<boolean> {
    return credentialRepositories.delete(id);
  }
}

export default new CredentialService();
