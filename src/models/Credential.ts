import { Schema, model } from "mongoose";
import { CredentialStatus, ICredential } from "../types/CredentialTypes";

/**
 * @schema PrintLogSchema
 * @description Sub-esquema para los registros de impresión. Se anida dentro de CredentialSchema.
 */
const PrintLogSchema = new Schema({
  printedAt: {
    type: Date,
    default: Date.now,
  },
  printedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

/**
 * @schema CredentialSchema
 * @description Esquema de Mongoose para el modelo de Credenciales.
 */
const CredentialSchema = new Schema<ICredential>(
  {
    ci: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellidos: {
      type: String,
      required: true,
      trim: true,
    },
    cargo: {
      type: String,
      required: false,
      trim: true,
    },
    foto_url: {
      type: String,
      required: false,
    },
    qr_code_url: {
      type: String,
      required: false, // Se genera después de la creación
    },
    status: {
      type: String,
      enum: Object.values(CredentialStatus),
      default: CredentialStatus.ACTIVE,
    },
    template: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    printLogs: [PrintLogSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ICredential>("Credential", CredentialSchema);
