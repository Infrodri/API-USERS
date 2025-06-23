import { Schema, model } from "mongoose";
import { ITemplate } from "../types/TemplateTypes";

/**
 * @schema TemplateSchema
 * @description Esquema de Mongoose para el modelo de Plantillas de Credencial.
 */
const TemplateSchema = new Schema<ITemplate>(
  {
    nombre_institucion: {
      type: String,
      required: true,
      trim: true,
    },
    nombre_organizacion: {
      type: String,
      required: false,
      trim: true,
    },
    logo_url: {
      type: String,
      required: false,
    },
    fondo_frontal_url: {
      type: String,
      required: false,
    },
    fondo_trasero_url: {
      type: String,
      required: false,
    },
    titulo_reverso: {
      type: String,
      required: false,
    },
    texto_recomendacion: {
      type: String,
      required: false,
    },
    texto_lateral: {
      type: String,
      required: false,
    },
    lugar_emision: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<ITemplate>("Template", TemplateSchema);
