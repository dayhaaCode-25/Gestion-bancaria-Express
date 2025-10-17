# Gestor Bancario - Frontend Express

Sistema de gestión bancaria desarrollado con Node.js y Express.js, que actúa como capa web frontend para consumir los servicios del backend Java/Spring Boot.

## 📋 Estructura del Proyecto

```
bancario-express/
├── src/
│   ├── routes/          # Rutas Express para la API
│   │   ├── auth.js      # Autenticación
│   │   ├── users.js     # Usuarios
│   │   ├── accounts.js  # Cuentas bancarias
│   │   └── transactions.js # Transacciones
│   ├── services/        # Servicios para comunicación con backend
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── accountService.js
│   │   └── transactionService.js
│   ├── views/           # Plantillas Handlebars
│   │   ├── layouts/     # Layouts principales
│   │   ├── partials/    # Componentes reutilizables
│   │   ├── login.hbs    # Página de login
│   │   ├── register.hbs # Página de registro
│   │   ├── dashboard.hbs # Dashboard principal
│   │   ├── 404.hbs      # Página de error 404
│   │   └── error.hbs    # Página de error 500
│   └── public/          # Archivos estáticos
│       ├── css/         # Estilos CSS
│       ├── js/          # JavaScript del frontend
│       └── assets/      # Imágenes y recursos
├── app.js              # Archivo principal de Express
├── package.json        # Dependencias y scripts
└── .env.example       # Variables de entorno de ejemplo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

1. **Node.js y npm**
   - Descargar e instalar desde: https://nodejs.org/
   - Verificar instalación: `node --version` y `npm --version`

2. **Backend Java en ejecución**
   - Asegúrese de que el backend Spring Boot esté ejecutándose en el puerto 8080

### Pasos de instalación

1. **Clonar o navegar al directorio del proyecto**
   ```bash
   cd "C:/Users/dayhana.acevedo/Desktop/bancario - Express"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Copiar el archivo de ejemplo
   copy .env.example .env
   
   # Editar .env con sus configuraciones
   ```

4. **Configurar el archivo .env**
   ```env
   PORT=3000
   BACKEND_API_URL=http://localhost:8080
   NODE_ENV=development
   SESSION_SECRET=mi_clave_secreta_super_segura
   JWT_SECRET=mi_jwt_secreto_muy_seguro
   JWT_EXPIRES_IN=24h
   ```

## 📦 Scripts Disponibles

```bash
# Iniciar el servidor en producción
npm start

# Iniciar el servidor en desarrollo (con nodemon)
npm run dev

# Ejecutar pruebas
npm test
```

## 🔧 Uso

### Desarrollo

1. **Iniciar el backend Java** (Spring Boot en puerto 8080)
2. **Iniciar el frontend Express**:
   ```bash
   npm run dev
   ```
3. **Acceder a la aplicación**: http://localhost:3000

### Funcionalidades Principales

#### Autenticación
- **Login**: `/` - Página de inicio de sesión
- **Registro**: `/registro` - Página de registro de usuarios

#### Dashboard
- **Panel principal**: `/dashboard` - Vista principal con información de la cuenta
- **Gestión de transacciones**: Depósitos, retiros y transferencias
- **Configuración de usuario**: Cambio de contraseña y datos personales

#### API Endpoints

**Autenticación**
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/logout` - Cerrar sesión

**Usuarios**
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `PUT /api/users/:id/password` - Cambiar contraseña

**Cuentas**
- `GET /api/accounts/:userId` - Obtener cuentas de usuario
- `GET /api/accounts/account/:accountNumber` - Obtener cuenta por número
- `POST /api/accounts` - Crear nueva cuenta
- `PUT /api/accounts/:accountId/status` - Actualizar estado de cuenta

**Transacciones**
- `GET /api/transactions/:accountId` - Obtener transacciones de cuenta
- `POST /api/transactions/deposit` - Realizar depósito
- `POST /api/transactions/withdraw` - Realizar retiro
- `POST /api/transactions/transfer` - Realizar transferencia
- `GET /api/transactions/transaction/:transactionId` - Obtener transacción por ID

## 🎨 Características del Frontend

### Tecnologías Utilizadas
- **Express.js**: Framework web para Node.js
- **Handlebars**: Motor de plantillas
- **CSS3**: Estilos personalizados con variables CSS
- **JavaScript ES6+**: Funcionalidades interactivas
- **Font Awesome**: Iconografía
- **Axios**: Cliente HTTP para requests al backend

### Características Responsive
- Diseño adaptable para dispositivos móviles y escritorio
- Sidebar colapsible en pantallas pequeñas
- Formularios optimizados para touch

### Funcionalidades JavaScript
- **Validación de formularios en tiempo real**
- **Notificaciones toast**
- **Loading spinners**
- **Manejo de errores elegante**
- **Formateo de moneda y fechas**
- **Almacenamiento local de sesión**

## 🔄 Integración con Backend Java

Este frontend está diseñado para consumir los servicios del backend Java/Spring Boot:

### Servicios Consumidos
- **AuthService**: Autenticación y autorización
- **UserService**: Gestión de usuarios
- **AccountService**: Gestión de cuentas bancarias
- **TransactionService**: Procesamiento de transacciones

### Configuración de CORS
Asegúrese de que el backend Java tenga configurado CORS para permitir requests desde `http://localhost:3000`

## 🛠️ Desarrollo

### Estructura de Archivos CSS
- `style.css`: Estilos principales del dashboard
- `auth.css`: Estilos específicos para autenticación

### Estructura de JavaScript
- `main.js`: Utilidades generales y configuración global
- `auth.js`: Funcionalidades específicas de autenticación

### Handlebars Helpers
El proyecto utiliza layouts y partials de Handlebars para reutilización de código:
- `layouts/main.hbs`: Layout principal
- `layouts/auth.hbs`: Layout para páginas de autenticación
- `partials/header.hbs`: Header común
- `partials/footer.hbs`: Footer común

## 📱 Responsive Design

El diseño es completamente responsivo con breakpoints en:
- **1024px**: Sidebar reducido
- **768px**: Sidebar colapsible
- **480px**: Layout móvil completo

## 🔒 Seguridad

- Validación de entrada en frontend y backend
- Sanitización de datos
- Manejo seguro de tokens JWT
- Protección CSRF implícita
- Headers de seguridad configurados

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
NODE_ENV=production
PORT=3000
BACKEND_API_URL=https://su-backend-api.com
SESSION_SECRET=clave_super_segura_para_produccion
JWT_SECRET=jwt_secreto_super_seguro_para_produccion
```

### Comandos de Producción
```bash
# Instalar dependencias de producción
npm ci --only=production

# Iniciar en producción
npm start
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Notas de Desarrollo

- El proyecto utiliza ES6+ y características modernas de JavaScript
- Se implementa patrón MVC adaptado para Express
- Separación clara entre lógica de presentación y lógica de negocio
- Código modular y reutilizable
- Documentación inline en código JavaScript

## 🐛 Solución de Problemas

### Error: npm command not found
Instalar Node.js desde https://nodejs.org/

### Error: Cannot connect to backend
Verificar que el backend Java esté ejecutándose en el puerto configurado

### Error: CORS policy
Configurar CORS en el backend Java para permitir el dominio del frontend

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - vea el archivo [LICENSE.md](LICENSE.md) para detalles.

---

**Desarrollado por**: Dayhana Acevedo  
**Fecha**: Octubre 2024  
**Versión**: 1.0.0