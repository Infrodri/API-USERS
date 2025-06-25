import mongoose, { Schema, model } from "mongoose";

export interface IAuditLog {
  action: string;
  description: string;
  user: string;
  userId: string;
  ip: string;
  userAgent: string;
  timestamp: Date;
  status: "success" | "error" | "warning" | "info";
  category: "authentication" | "credentials" | "users" | "templates" | "printing" | "security" | "system";
  details?: Record<string, unknown>;
  sessionId?: string;
  location?: string;
  device?: string;
}

const AuditLogSchema: Schema = new Schema<IAuditLog>(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
      trim: true,
    },
    userAgent: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      enum: ["success", "error", "warning", "info"],
      default: "info",
    },
    category: {
      type: String,
      required: true,
      enum: ["authentication", "credentials", "users", "templates", "printing", "security", "system"],
      default: "system",
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
    sessionId: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    device: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Índices para mejorar el rendimiento de las consultas
AuditLogSchema.index({ userId: 1, timestamp: -1 });
AuditLogSchema.index({ category: 1, timestamp: -1 });
AuditLogSchema.index({ status: 1, timestamp: -1 });
AuditLogSchema.index({ timestamp: -1 });

export default model<IAuditLog>("AuditLog", AuditLogSchema); 