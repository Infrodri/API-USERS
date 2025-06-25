import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import rolesController from "@controllers/rolesControllers";
import userController from "@controllers/usersControllers";
import * as authController from "@controllers/auth/authControllers";
import institutionController from "@controllers/institutionController";
import templateController from "@controllers/templateController";
import credentialController from "@controllers/credentialController";
import printLogController from "@controllers/PrintLogController";
import reportController from "@controllers/ReportController";
import profileController from "@controllers/profileController";
import systemSettingsController from "@controllers/systemSettingsController";
import printerSettingsController from "@controllers/printerSettingsController";
import notificationSettingsController from "@controllers/notificationSettingsController";
import securitySettingsController from "@controllers/securitySettingsController";
import notificationController from "@controllers/notificationController";
import auditController from "@controllers/auditController";
import { getPermissons, verifyToken } from "@middlewares/auth";
import { checkRoles } from "@middlewares/roles";

const router = Router();

export default () => {
  router.get("/health", (req: Request, res: Response) => {
    res.send("Api is Healthy!!!");
  });

  // Rutas de Autenticación
  router.post(
    "/auth/register",
    checkRoles,
    asyncHandler(authController.registerUser)
  );
  router.post("/auth/login", asyncHandler(authController.loginUser));

  // Rutas de Usuarios
  router.get(
    "/users",
    verifyToken,
    getPermissons,
    asyncHandler(userController.getAll)
  );
  router.get(
    "/users/:id",
    verifyToken,
    getPermissons,
    asyncHandler(userController.getById)
  );
  router.post(
    "/users",
    verifyToken,
    getPermissons,
    checkRoles,
    asyncHandler(userController.create)
  );
  router.put(
    "/users/:id",
    verifyToken,
    getPermissons,
    asyncHandler(userController.update)
  );
  router.delete(
    "/users/:id",
    verifyToken,
    getPermissons,
    asyncHandler(userController.delete)
  );

  // Rutas de Roles
  router.get(
    "/roles",
    verifyToken,
    getPermissons,
    asyncHandler(rolesController.getAll)
  );
  router.get(
    "/roles/:id",
    verifyToken,
    getPermissons,
    asyncHandler(rolesController.getById)
  );
  router.post(
    "/roles",
    verifyToken,
    getPermissons,
    asyncHandler(rolesController.create)
  );
  router.put(
    "/roles/:id",
    verifyToken,
    getPermissons,
    asyncHandler(rolesController.update)
  );
  router.delete(
    "/roles/:id",
    verifyToken,
    getPermissons,
    asyncHandler(rolesController.delete)
  );

  // Rutas de Instituciones
  router.get(
    "/institutions",
    verifyToken,
    getPermissons,
    asyncHandler(institutionController.getAll)
  );
  router.get(
    "/institutions/:id",
    verifyToken,
    getPermissons,
    asyncHandler(institutionController.getById)
  );
  router.post(
    "/institutions",
    verifyToken,
    getPermissons,
    asyncHandler(institutionController.create)
  );
  router.put(
    "/institutions/:id",
    verifyToken,
    getPermissons,
    asyncHandler(institutionController.update)
  );
  router.delete(
    "/institutions/:id",
    verifyToken,
    getPermissons,
    asyncHandler(institutionController.delete)
  );

  // Rutas de Plantillas (Templates)
  router.get(
    "/templates",
    verifyToken,
    getPermissons,
    asyncHandler(templateController.getAll)
  );
  router.get(
    "/templates/:id",
    verifyToken,
    getPermissons,
    asyncHandler(templateController.getById)
  );
  router.post(
    "/templates",
    verifyToken,
    getPermissons,
    asyncHandler(templateController.create)
  );
  router.put(
    "/templates/:id",
    verifyToken,
    getPermissons,
    asyncHandler(templateController.update)
  );
  router.delete(
    "/templates/:id",
    verifyToken,
    getPermissons,
    asyncHandler(templateController.delete)
  );

  // Rutas de Credenciales
  router.get(
    "/credentials",
    verifyToken,
    getPermissons,
    asyncHandler(credentialController.getAll)
  );
  router.get(
    "/credentials/:id",
    verifyToken,
    getPermissons,
    asyncHandler(credentialController.getById)
  );
  router.post(
    "/credentials",
    verifyToken,
    getPermissons,
    asyncHandler(credentialController.create)
  );
  router.put(
    "/credentials/:id",
    verifyToken,
    getPermissons,
    asyncHandler(credentialController.update)
  );
  router.delete(
    "/credentials/:id",
    verifyToken,
    getPermissons,
    asyncHandler(credentialController.delete)
  );
  router.post(
    "/credentials/:id/print",
    verifyToken,
    getPermissons,
    asyncHandler(printLogController.create)
  );

  // Rutas de Verificación Pública
  router.get("/verify/:qrCode", asyncHandler(credentialController.verify));
  router.get(
    "/verify-details/:qrCode",
    verifyToken,
    getPermissons,
    asyncHandler(credentialController.verifyWithDetails)
  );

  // Rutas de Reportes
  router.get(
    "/reports/history/:ci",
    verifyToken,
    getPermissons,
    asyncHandler(reportController.getHistoryByCI)
  );
  router.get(
    "/reports/prints-by-date",
    verifyToken,
    getPermissons,
    asyncHandler(reportController.getPrintsByDate)
  );

  // Rutas de Perfil
  router.get(
    "/profile",
    verifyToken,
    asyncHandler(profileController.getProfile)
  );
  router.put(
    "/profile",
    verifyToken,
    asyncHandler(profileController.updateProfile)
  );
  router.put(
    "/profile/change-password",
    verifyToken,
    asyncHandler(profileController.changePassword)
  );
  router.get(
    "/profile/stats",
    verifyToken,
    asyncHandler(profileController.getProfileStats)
  );

  // Rutas de Configuración del Sistema
  router.get(
    "/settings/system",
    verifyToken,
    getPermissons,
    asyncHandler(systemSettingsController.get)
  );
  router.put(
    "/settings/system",
    verifyToken,
    getPermissons,
    asyncHandler(systemSettingsController.update)
  );
  router.post(
    "/settings/system/reset",
    verifyToken,
    getPermissons,
    asyncHandler(systemSettingsController.reset)
  );

  // Rutas de Configuración de Impresoras
  router.get(
    "/settings/printer",
    verifyToken,
    getPermissons,
    asyncHandler(printerSettingsController.get)
  );
  router.put(
    "/settings/printer",
    verifyToken,
    getPermissons,
    asyncHandler(printerSettingsController.update)
  );
  router.post(
    "/settings/printer/reset",
    verifyToken,
    getPermissons,
    asyncHandler(printerSettingsController.reset)
  );

  // Rutas de Configuración de Notificaciones
  router.get(
    "/settings/notifications",
    verifyToken,
    getPermissons,
    asyncHandler(notificationSettingsController.get)
  );
  router.put(
    "/settings/notifications",
    verifyToken,
    getPermissons,
    asyncHandler(notificationSettingsController.update)
  );
  router.post(
    "/settings/notifications/reset",
    verifyToken,
    getPermissons,
    asyncHandler(notificationSettingsController.reset)
  );

  // Rutas de Configuración de Seguridad
  router.get(
    "/settings/security",
    verifyToken,
    getPermissons,
    asyncHandler(securitySettingsController.get)
  );
  router.put(
    "/settings/security",
    verifyToken,
    getPermissons,
    asyncHandler(securitySettingsController.update)
  );
  router.post(
    "/settings/security/reset",
    verifyToken,
    getPermissons,
    asyncHandler(securitySettingsController.reset)
  );

  // Rutas de Notificaciones
  router.get(
    "/notifications/user/:userId",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.getByUserId)
  );
  router.get(
    "/notifications/:id",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.getById)
  );
  router.post(
    "/notifications",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.create)
  );
  router.put(
    "/notifications/:id/read",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.markAsRead)
  );
  router.put(
    "/notifications/user/:userId/read-all",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.markAllAsRead)
  );
  router.get(
    "/notifications/user/:userId/unread-count",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.getUnreadCount)
  );
  router.delete(
    "/notifications/:id",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.delete)
  );
  router.delete(
    "/notifications/user/:userId",
    verifyToken,
    getPermissons,
    asyncHandler(notificationController.deleteByUserId)
  );

  // Rutas de Auditoría
  router.get(
    "/audit/logs",
    verifyToken,
    getPermissons,
    asyncHandler(auditController.getLogs)
  );
  router.get(
    "/audit/logs/:id",
    verifyToken,
    getPermissons,
    asyncHandler(auditController.getById)
  );
  router.get(
    "/audit/logs/user/:userId",
    verifyToken,
    getPermissons,
    asyncHandler(auditController.getByUserId)
  );
  router.get(
    "/audit/logs/category/:category",
    verifyToken,
    getPermissons,
    asyncHandler(auditController.getByCategory)
  );
  router.get(
    "/audit/logs/date-range",
    verifyToken,
    getPermissons,
    asyncHandler(auditController.getByDateRange)
  );
  router.get(
    "/audit/stats",
    verifyToken,
    getPermissons,
    asyncHandler(auditController.getStats)
  );
  router.delete(
    "/audit/logs/old/:daysOld",
    verifyToken,
    getPermissons,
    asyncHandler(auditController.deleteOldLogs)
  );

  return router;
};
