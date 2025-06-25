import { Request, Response, RequestHandler } from "express";
import userService from "@services/userService";

/**
 * @class ProfileController
 * @description Controlador para gestionar las operaciones del perfil de usuario.
 */
class ProfileController {
  /**
   * @method getProfile
   * @description Obtiene el perfil del usuario autenticado.
   */
  public getProfile: RequestHandler = async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      // Excluir información sensible
      const { password, ...profile } = user.toObject();
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el perfil" });
    }
  };

  /**
   * @method updateProfile
   * @description Actualiza el perfil del usuario autenticado.
   */
  public updateProfile: RequestHandler = async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      // Solo permitir actualizar campos del perfil, no roles ni permisos
      const { name, email, phone, position, department, ...rest } = req.body;
      const updateData = { name, email, phone, position, department };

      const updatedUser = await userService.updateUser(userId, updateData);
      if (!updatedUser) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      // Excluir información sensible
      const { password, ...profile } = updatedUser.toObject();
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el perfil" });
    }
  };

  /**
   * @method changePassword
   * @description Cambia la contraseña del usuario autenticado.
   */
  public changePassword: RequestHandler = async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        res
          .status(400)
          .json({ message: "Se requieren la contraseña actual y la nueva" });
        return;
      }

      const success = await userService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      if (!success) {
        res.status(400).json({ message: "Contraseña actual incorrecta" });
        return;
      }

      res.status(200).json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al cambiar la contraseña" });
    }
  };

  /**
   * @method getProfileStats
   * @description Obtiene estadísticas del perfil del usuario.
   */
  public getProfileStats: RequestHandler = async (req, res) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      // Aquí podrías agregar lógica para obtener estadísticas del usuario
      // como número de credenciales creadas, últimas actividades, etc.
      const stats = {
        credentialsCreated: 0,
        lastLogin: new Date(),
        totalPrints: 0,
        // Agregar más estadísticas según sea necesario
      };

      res.status(200).json(stats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener estadísticas del perfil" });
    }
  };
}

export default new ProfileController();
