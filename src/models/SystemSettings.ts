import mongoose, { Schema, model } from "mongoose";

export interface ISystemSettings {
  systemName: string;
  systemVersion: string;
  companyName: string;
  contactEmail: string;
  maxCredentialsPerUser: number;
  defaultCredentialExpiry: number;
}

const SystemSettingsSchema: Schema = new Schema<ISystemSettings>(
  {
    systemName: {
      type: String,
      required: true,
      default: "Sistema de Credenciales",
      trim: true,
    },
    systemVersion: {
      type: String,
      required: true,
      default: "1.0.0",
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      default: "Empresa Ejemplo",
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      default: "admin@empresa.com",
      trim: true,
    },
    maxCredentialsPerUser: {
      type: Number,
      required: true,
      default: 100,
      min: 1,
    },
    defaultCredentialExpiry: {
      type: Number,
      required: true,
      default: 365,
      min: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ISystemSettings>("SystemSettings", SystemSettingsSchema);
