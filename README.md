# API de Gestión de Credenciales

Backend completo para el sistema de gestión de credenciales.

## 🚀 Instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar .env**
   ```env
   MONGODB_URL_STRING=mongodb://localhost:27017/credenciales
   JWT_SECRET=tu_jwt_secret
   PORT=4000
   ```

3. **Ejecutar**
   ```bash
   npm run dev
   ```

## 📚 Endpoints Principales

### Autenticación
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Registro

### Usuarios & Perfil
- `GET /api/v1/users` - Listar usuarios
- `GET /api/v1/profile` - Perfil del usuario
- `PUT /api/v1/profile/change-password` - Cambiar contraseña

### Configuraciones
- `GET /api/v1/settings/system` - Configuración del sistema
- `GET /api/v1/settings/printer` - Configuración de impresoras
- `GET /api/v1/settings/notifications` - Configuración de notificaciones
- `GET /api/v1/settings/security` - Configuración de seguridad

### Notificaciones
- `GET /api/v1/notifications/user/:userId` - Notificaciones del usuario
- `PUT /api/v1/notifications/:id/read` - Marcar como leída

### Auditoría
- `GET /api/v1/audit/logs` - Logs de auditoría
- `GET /api/v1/audit/stats` - Estadísticas

## 🔐 Autenticación

Incluir token en headers:
```
Authorization: Bearer <token>
```

## 🗄️ Base de Datos

El sistema inicializa automáticamente las configuraciones por defecto al conectarse a MongoDB. 