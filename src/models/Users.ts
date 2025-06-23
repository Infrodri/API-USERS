import mongoose, { Schema, model } from "mongoose";
import { User } from "types/UsersTypes";
import bcrypt from "bcrypt";

const UserSchema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
    roles: [
      {
        ref: "Roles",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Middleware que se ejecuta ANTES de guardar un documento de usuario.
 * Su propósito es encriptar la contraseña si ha sido modificada.
 */
UserSchema.pre("save", async function (next) {
  const user = this as any;
  // Si la contraseña no ha sido modificada, no hacemos nada y continuamos.
  if (!user.isModified("password")) {
    return next();
  }
  // Generamos un "salt" para hacer el hash más seguro.
  const salt = await bcrypt.genSalt(12);
  // Hasheamos la contraseña y la reemplazamos en el documento.
  if (user.password) {
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

/**
 * Método para comparar la contraseña proporcionada con la almacenada en la base de datos.
 * @param {string} password - La contraseña en texto plano para comparar.
 * @returns {Promise<boolean>} - Devuelve `true` si las contraseñas coinciden, `false` en caso contrario.
 */
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

/**
 * Sobrescribe el método toJSON para eliminar la contraseña del objeto
 * que se envía como respuesta en la API. Es una medida de seguridad.
 */
UserSchema.set("toJSON", {
  transform: (doc: any, ret: any) => {
    delete ret.password;
    return ret;
  },
});

export default model<User>("User", UserSchema);
