// Configuración centralizada de la aplicación
const config = {
    // URL base del backend Java Spring Boot
    API_BASE_URL: process.env.BACKEND_API_URL || 'http://localhost:8090',
    
    // Puerto del servidor Express
    PORT: process.env.PORT || 3002,
    
    // Configuración de CORS
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3002',
    
    // Entorno de desarrollo
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // Endpoints del backend
    ENDPOINTS: {
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        USERS: '/api/usuarios',
        ACCOUNTS: '/api/cuentas',
        TRANSACTIONS: '/api/transacciones'
    }
};

module.exports = config;