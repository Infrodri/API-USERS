import mongoose, { Schema, model } from "mongoose";

export interface ISecuritySettings {
  sessionTimeout: number;
  requirePasswordChange: number;
  maxLoginAttempts: number;
  enableTwoFactor: boolean;
  passwordMinLength: number;
}

const SecuritySettingsSchema: Schema = new Schema<ISecuritySettings>(
  {
    sessionTimeout: {
      type: Number,
      required: true,
      default: 30,
      min: 5,
      max: 1440, // 24 horas en minutos
    },
    requirePasswordChange: {
      type: Number,
      required: true,
      default: 90,
      min: 1,
      max: 365,
    },
    maxLoginAttempts: {
      type: Number,
      required: true,
      default: 5,
      min: 1,
      max: 10,
    },
    enableTwoFactor: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordMinLength: {
      type: Number,
      required: true,
      default: 8,
      min: 6,
      max: 20,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ISecuritySettings>(
  "SecuritySettings",
  SecuritySettingsSchema
);
