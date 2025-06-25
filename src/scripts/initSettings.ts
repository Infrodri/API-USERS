import mongoose from "mongoose";
import SystemSettings from "@models/SystemSettings";
import PrinterSettings from "@models/PrinterSettings";
import NotificationSettings from "@models/NotificationSettings";
import SecuritySettings from "@models/SecuritySettings";

/**
 * Script para inicializar las configuraciones por defecto en la base de datos
 */
async function initializeSettings() {
  try {
    console.log("Inicializando configuraciones del sistema...");

    // Verificar si ya existen configuraciones
    const existingSystemSettings = await SystemSettings.findOne();
    if (!existingSystemSettings) {
      await SystemSettings.create({
        companyName: "Mi Empresa",
        companyLogo: "",
        systemVersion: "1.0.0",
        maintenanceMode: false,
        maxFileSize: 5, // MB
        allowedFileTypes: ["jpg", "jpeg", "png", "pdf"],
        backupFrequency: "daily",
        backupRetention: 30, // días
        emailSettings: {
          smtpHost: "smtp.gmail.com",
          smtpPort: 587,
          smtpUser: "",
          smtpPassword: "",
          fromEmail: "noreply@miempresa.com",
          fromName: "Sistema de Credenciales",
        },
      });
      console.log("✓ Configuración del sistema inicializada");
    }

    const existingPrinterSettings = await PrinterSettings.findOne();
    if (!existingPrinterSettings) {
      await PrinterSettings.create({
        defaultPrinter: "default",
        printQuality: "high",
        paperSize: "A4",
        orientation: "portrait",
        margins: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
        autoPrint: false,
        printPreview: true,
        copies: 1,
      });
      console.log("✓ Configuración de impresoras inicializada");
    }

    const existingNotificationSettings = await NotificationSettings.findOne();
    if (!existingNotificationSettings) {
      await NotificationSettings.create({
        emailNotifications: {
          enabled: true,
          credentialCreated: true,
          credentialUpdated: true,
          credentialDeleted: true,
          systemAlerts: true,
        },
        pushNotifications: {
          enabled: false,
          credentialCreated: true,
          credentialUpdated: true,
          credentialDeleted: true,
          systemAlerts: true,
        },
        smsNotifications: {
          enabled: false,
          credentialCreated: false,
          credentialUpdated: false,
          credentialDeleted: false,
          systemAlerts: false,
        },
        notificationRetention: 30, // días
      });
      console.log("✓ Configuración de notificaciones inicializada");
    }

    const existingSecuritySettings = await SecuritySettings.findOne();
    if (!existingSecuritySettings) {
      await SecuritySettings.create({
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          maxAge: 90, // días
        },
        sessionPolicy: {
          sessionTimeout: 30, // minutos
          maxConcurrentSessions: 3,
          rememberMe: true,
          rememberMeDuration: 30, // días
        },
        loginPolicy: {
          maxLoginAttempts: 5,
          lockoutDuration: 15, // minutos
          requireTwoFactor: false,
          allowedIpRanges: [],
        },
        auditPolicy: {
          logLoginAttempts: true,
          logDataChanges: true,
          logSystemEvents: true,
          retentionPeriod: 365, // días
        },
      });
      console.log("✓ Configuración de seguridad inicializada");
    }

    console.log(
      "✅ Todas las configuraciones han sido inicializadas correctamente"
    );
  } catch (error) {
    console.error("❌ Error al inicializar configuraciones:", error);
    throw error;
  }
}

// Ejecutar el script si se llama directamente
if (require.main === module) {
  // Conectar a la base de datos
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/credenciales";

  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Conectado a MongoDB");
      return initializeSettings();
    })
    .then(() => {
      console.log("Script completado exitosamente");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error en el script:", error);
      process.exit(1);
    });
}

export default initializeSettings;
