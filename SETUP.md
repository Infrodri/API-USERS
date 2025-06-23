# 🚀 Configuración y Pruebas de la API USERS

## 📋 Requisitos Previos

- **Node.js** (versión 16 o superior)
- **MongoDB** (versión 4.4 o superior)
- **npm** o **yarn**

## 🔧 Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Puerto del servidor
PORT=3000

# Configuración de MongoDB
MONGODB_URI=mongodb://localhost:27017/credentials_db

# JWT Secret (¡CAMBIA ESTO EN PRODUCCIÓN!)
JWT_SECRET=tu_jwt_secret_super_seguro_aqui_2024

# Configuración de logs
NODE_ENV=development
LOG_LEVEL=debug
```

### 3. Iniciar MongoDB
Asegúrate de que MongoDB esté corriendo en tu sistema:
```bash
# En Windows (si tienes MongoDB instalado como servicio)
net start MongoDB

# En macOS/Linux
sudo systemctl start mongod
# o
brew services start mongodb-community
```

### 4. Compilar TypeScript
```bash
npm run build
```

### 5. Iniciar el Servidor
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## 🧪 Guía de Pruebas

### Orden Recomendado de Pruebas

1. **Autenticación** (Sección 1)
   - Registrar un usuario admin
   - Hacer login para obtener el token

2. **Roles** (Sección 2)
   - Crear roles básicos (admin, funcionario, etc.)
   - Probar CRUD completo

3. **Usuarios** (Sección 3)
   - Crear usuarios con diferentes roles
   - Probar actualizaciones y eliminaciones

4. **Plantillas** (Sección 4)
   - Crear plantillas para credenciales
   - Configurar diseños y campos

5. **Credenciales** (Sección 5)
   - Crear credenciales usando las plantillas
   - Probar filtros y búsquedas

6. **Verificación** (Sección 6)
   - Probar endpoints públicos de verificación

7. **Impresiones** (Sección 7)
   - Registrar impresiones de credenciales

8. **Reportes** (Sección 8)
   - Generar reportes de historial y estadísticas

### Uso del Archivo users.http

1. **Abrir en VS Code** con la extensión "REST Client"
2. **Ejecutar el login** primero para obtener el token
3. **Probar cada endpoint** en el orden recomendado
4. **Reemplazar IDs** con los reales de tu base de datos

### Variables del Archivo HTTP

- `@baseUrl`: URL base de la API (http://localhost:3000/api)
- `@authToken`: Token JWT obtenido automáticamente del login

## 🔍 Endpoints Disponibles

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### Roles
- `GET /roles` - Obtener todos los roles
- `GET /roles/:id` - Obtener rol por ID
- `POST /roles` - Crear nuevo rol
- `PUT /roles/:id` - Actualizar rol
- `DELETE /roles/:id` - Eliminar rol

### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear nuevo usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Plantillas
- `GET /templates` - Obtener todas las plantillas
- `GET /templates/:id` - Obtener plantilla por ID
- `POST /templates` - Crear nueva plantilla
- `PUT /templates/:id` - Actualizar plantilla
- `DELETE /templates/:id` - Eliminar plantilla

### Credenciales
- `GET /credentials` - Obtener todas las credenciales
- `GET /credentials/:id` - Obtener credencial por ID
- `POST /credentials` - Crear nueva credencial
- `PUT /credentials/:id` - Actualizar credencial
- `DELETE /credentials/:id` - Eliminar credencial
- `GET /credentials/verify/:qrCode` - Verificar credencial (público)
- `GET /credentials/verify-details/:qrCode` - Verificar con detalles (público)
- `POST /credentials/:id/print` - Registrar impresión

### Reportes
- `GET /reports/history/:ci` - Historial por CI
- `GET /reports/prints-by-date` - Conteo de impresiones por fecha

## 🛡️ Seguridad

### Middlewares Implementados
- **verifyToken**: Verifica el token JWT
- **getPermissons**: Verifica permisos del usuario
- **checkRoles**: Valida roles al crear usuarios

### Autenticación
- Tokens JWT con expiración de 30 días
- Contraseñas encriptadas con bcrypt
- Validación de permisos por rol

## 📊 Estructura de Datos

### Usuario
```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "roles": ["ObjectId"],
  "permissions": ["string"]
}
```

### Rol
```json
{
  "name": "string",
  "description": "string",
  "permissions": ["string"]
}
```

### Plantilla
```json
{
  "name": "string",
  "description": "string",
  "design": {
    "backgroundColor": "string",
    "textColor": "string",
    "logoUrl": "string",
    "fontFamily": "string"
  },
  "fields": [
    {
      "name": "string",
      "type": "string",
      "position": { "x": "number", "y": "number" },
      "required": "boolean"
    }
  ]
}
```

### Credencial
```json
{
  "ci": "string",
  "nombre": "string",
  "apellidos": "string",
  "cargo": "string",
  "foto_url": "string",
  "qr_code_url": "string",
  "status": "activo|inactivo|expirado|revocado",
  "template": "ObjectId",
  "printLogs": [
    {
      "printedAt": "Date",
      "printedBy": "ObjectId",
      "location": "string"
    }
  ]
}
```

## 🚨 Solución de Problemas

### Error de Conexión a MongoDB
```bash
# Verificar que MongoDB esté corriendo
mongo --eval "db.runCommand('ping')"
```

### Error de Token JWT
- Verificar que `JWT_SECRET` esté configurado
- Asegurarse de que el token no haya expirado

### Error de Permisos
- Verificar que el usuario tenga los roles correctos
- Revisar la configuración de permisos en el middleware

### Error de Compilación TypeScript
```bash
# Limpiar y recompilar
rm -rf dist/
npm run build
```

## 📝 Notas Adicionales

- Los endpoints de verificación de credenciales son **públicos**
- Las contraseñas se encriptan automáticamente antes de guardar
- Los QR codes se generan automáticamente al crear credenciales
- El historial de impresiones se mantiene automáticamente
- Los reportes incluyen filtros por fecha y CI

¡Listo para probar! 🎉 