const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8090';

class UserService {
    async getUserById(userId) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/usuarios/${userId}`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en UserService.getUserById:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'Usuario no encontrado'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async updateUser(userId, userData) {
        try {
            const response = await axios.put(`${BACKEND_URL}/api/usuarios/${userId}`, userData);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en UserService.updateUser:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error actualizando usuario'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async changePassword(userId, currentPassword, newPassword) {
        try {
            const response = await axios.put(`${BACKEND_URL}/api/usuarios/${userId}/password`, {
                currentPassword,
                newPassword
            });
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en UserService.changePassword:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error cambiando contraseña'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async getAllUsers() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/usuarios`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en UserService.getAllUsers:', error.message);
            
            return {
                success: false,
                message: 'Error obteniendo usuarios'
            };
        }
    }

    async deleteUser(userId) {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/usuarios/${userId}`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en UserService.deleteUser:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'Usuario no encontrado'
                };
            }
            
            return {
                success: false,
                message: 'Error eliminando usuario'
            };
        }
    }
}

module.exports = new UserService();