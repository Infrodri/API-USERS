import mongoose, { Schema, model } from "mongoose";

export interface INotificationSettings {
  emailNotifications: boolean;
  credentialExpiryAlerts: boolean;
  expiryAlertDays: number;
  systemAlerts: boolean;
  printNotifications: boolean;
}

const NotificationSettingsSchema: Schema = new Schema<INotificationSettings>(
  {
    emailNotifications: {
      type: Boolean,
      required: true,
      default: true,
    },
    credentialExpiryAlerts: {
      type: Boolean,
      required: true,
      default: true,
    },
    expiryAlertDays: {
      type: Number,
      required: true,
      default: 30,
      min: 1,
      max: 365,
    },
    systemAlerts: {
      type: Boolean,
      required: true,
      default: true,
    },
    printNotifications: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<INotificationSettings>(
  "NotificationSettings",
  NotificationSettingsSchema
);
