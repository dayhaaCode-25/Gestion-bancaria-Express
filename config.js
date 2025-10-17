// Configuración centralizada para la aplicación Express

const config = {
    development: {
        port: process.env.PORT || 3000,
        backendUrl: process.env.BACKEND_API_URL || 'http://localhost:8080',
        sessionSecret: process.env.SESSION_SECRET || 'desarrollo_secreto',
        jwtSecret: process.env.JWT_SECRET || 'desarrollo_jwt_secreto',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
        corsOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        logLevel: 'debug'
    },
    
    production: {
        port: process.env.PORT || 3000,
        backendUrl: process.env.BACKEND_API_URL,
        sessionSecret: process.env.SESSION_SECRET,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
        corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [],
        logLevel: 'info'
    },
    
    test: {
        port: process.env.PORT || 3001,
        backendUrl: 'http://localhost:8081',
        sessionSecret: 'test_secreto',
        jwtSecret: 'test_jwt_secreto',
        jwtExpiresIn: '1h',
        corsOrigins: ['http://localhost:3001'],
        logLevel: 'error'
    }
};

const env = process.env.NODE_ENV || 'development';

module.exports = {
    ...config[env],
    env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isTest: env === 'test'
};