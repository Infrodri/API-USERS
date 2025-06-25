import mongoose, { Schema, model } from "mongoose";

export interface IPrinterSettings {
  defaultPrinter: string;
  printQuality: "low" | "medium" | "high";
  paperSize: "A4" | "A5" | "Letter";
  enableAutoPrint: boolean;
  printLocation: string;
}

const PrinterSettingsSchema: Schema = new Schema<IPrinterSettings>(
  {
    defaultPrinter: {
      type: String,
      required: true,
      default: "HP LaserJet Pro",
      trim: true,
    },
    printQuality: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "high",
    },
    paperSize: {
      type: String,
      required: true,
      enum: ["A4", "A5", "Letter"],
      default: "A4",
    },
    enableAutoPrint: {
      type: Boolean,
      required: true,
      default: false,
    },
    printLocation: {
      type: String,
      required: true,
      default: "Oficina Principal",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IPrinterSettings>(
  "PrinterSettings",
  PrinterSettingsSchema
);
