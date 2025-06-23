import { Request, Response, RequestHandler } from "express";
import credentialService from "../services/credentialService";

/**
 * @class CredentialController
 * @description Controlador para gestionar las operaciones CRUD de las credenciales.
 */
class CredentialController {
  public getAll: RequestHandler = async (req, res) => {
    const credentials = await credentialService.getCredentials(req.query);
    res.status(200).json(credentials);
  };

  public getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const credential = await credentialService.getCredentialById(id);
    if (!credential) {
      res.status(404).json({ message: "Credential not found" });
      return;
    }
    res.status(200).json(credential);
  };

  public create: RequestHandler = async (req, res) => {
    const newCredential = await credentialService.createCredential(req.body);
    res.status(201).json(newCredential);
  };

  public update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updatedCredential = await credentialService.updateCredential(
      id,
      req.body
    );
    if (!updatedCredential) {
      res.status(404).json({ message: "Credential not found" });
      return;
    }
    res.status(200).json(updatedCredential);
  };

  public delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const success = await credentialService.deleteCredential(id);
    if (!success) {
      res
        .status(404)
        .json({ message: "Credential not found or already deactivated" });
      return;
    }
    res.status(204).send();
  };

  // --- QR Verification ---
  public verify: RequestHandler = async (req, res) => {
    const { qrCode } = req.params;
    const result = await credentialService.verifyCredentialByQr(qrCode);

    if (!result.valid) {
      res.status(404).json({
        isValid: false,
        message: result.message,
      });
      return;
    }

    const publicResponse = {
      isValid: true,
      status: result.credential?.status,
    };

    res.status(200).json(publicResponse);
  };

  public verifyWithDetails: RequestHandler = async (req, res) => {
    const { qrCode } = req.params;
    const result = await credentialService.verifyCredentialByQr(qrCode);

    if (!result.valid) {
      res.status(404).json({
        isValid: false,
        message: result.message,
      });
      return;
    }

    res.status(200).json({
      isValid: true,
      credential: result.credential,
    });
  };
}

export default new CredentialController();
