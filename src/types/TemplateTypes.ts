import { Document } from "mongoose";

/**
 * @interface Template
 * @description Define la estructura de una plantilla de credencial.
 * Contiene todos los elementos visuales y de texto que componen un diseño de credencial.
 */
export interface ITemplate extends Document {
  nombre_institucion: string;
  nombre_organizacion?: string;
  logo_url?: string;
  fondo_frontal_url?: string;
  fondo_trasero_url?: "string";
  titulo_reverso?: string;
  texto_recomendacion?: string;
  texto_lateral?: string;
  lugar_emision?: string;
}
