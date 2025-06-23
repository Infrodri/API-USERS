import { Document, Schema } from "mongoose";
import { User } from "./UsersTypes";
import { ITemplate } from "./TemplateTypes";

/**
 * @enum CredentialStatus
 * @description Define los posibles estados de una credencial.
 */
export enum CredentialStatus {
  ACTIVE = "activo",
  INACTIVE = "inactivo",
  EXPIRED = "expirado",
  REVOKED = "revocado",
}

/**
 * @interface IPrintLog
 * @description Define la estructura de un registro de impresión para una credencial.
 */
export interface IPrintLog {
  printedAt: Date;
  printedBy: Schema.Types.ObjectId | User;
  location: string;
}

/**
 * @interface ICredential
 * @description Define la estructura de una credencial de un funcionario.
 */
export interface ICredential extends Document {
  ci: string;
  nombre: string;
  apellidos: string;
  cargo?: string;
  foto_url?: string;
  qr_code_url?: string;
  status: CredentialStatus;
  template: Schema.Types.ObjectId | ITemplate;
  printLogs: IPrintLog[];
}
