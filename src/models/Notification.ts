import mongoose, { Schema, model } from "mongoose";

export interface INotification {
  title: string;
  message: string;
  type: "alert" | "info" | "success" | "error";
  read: boolean;
  userId: string;
  category: string;
  metadata?: Record<string, unknown>;
}

const NotificationSchema: Schema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["alert", "info", "success", "error"],
      default: "info",
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "general",
      trim: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Índices para mejorar el rendimiento de las consultas
NotificationSchema.index({ userId: 1, read: 1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ category: 1 });

export default model<INotification>("Notification", NotificationSchema); 