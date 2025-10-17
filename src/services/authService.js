const apiService = require('./apiService');

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8090';

// Credenciales de demostracion 
const DEMO_USERS = [
    {
        id: 1,
        email: 'admin@bancario.com',
        password: 'admin123',
        nombre: 'Administrador',
        rol: 'admin',
        cuenta: '1234567890',
        saldo: 5000000,
        token: 'demo_token_admin_123'
    },
    {
        id: 2,
        email: 'usuario@bancario.com',
        password: 'usuario123',
        nombre: 'Usuario Demo',
        rol: 'usuario',
        cuenta: '0987654321',
        saldo: 1500000,
        token: 'demo_token_user_456'
    },
    {
        id: 3,
        email: 'dayhana@bancario.com',
        password: 'dayhana123',
        nombre: 'Dayhana Acevedo',
        rol: 'usuario',
        cuenta: '1122334455',
        saldo: 2750000,
        token: 'demo_token_dayhana_789'
    }
];

class AuthService {
    async login(email, password) {
        
        const demoUser = this.authenticateDemo(email, password);
        if (demoUser) {
            console.log('🎭 Modo Demo: Usuario autenticado localmente');
            return {
                success: true,
                data: demoUser
            };
        }

        // Intentar con el backend real
        try {
            console.log(`🔗 Conectando al backend para: ${email}`);
            const result = await apiService.login(email, password);
            
            if (result.success) {
                console.log(`✅ Login exitoso con backend para: ${email}`);
                return result;
            } else {
                console.log(`❌ Login fallido en backend: ${result.message}`);
                return result;
            }
        } catch (error) {
            console.error('❌ Error conectando al backend:', error.message);
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    
    authenticateDemo(email, password) {
        const user = DEMO_USERS.find(u => u.email === email && u.password === password);
        if (user) {
            
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    async register(userData) {
        try {
            const response = await apiService.register(userData);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AuthService.register:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error en el registro'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async validateToken(token) {
        try {
            const response = await apiService.validateToken(token);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AuthService.validateToken:', error.message);
            
            return {
                success: false,
                message: 'Token inválido'
            };
        }
    }
}

module.exports = new AuthService();