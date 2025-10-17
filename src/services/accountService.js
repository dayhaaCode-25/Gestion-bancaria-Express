const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8080';

class AccountService {
    async getAccountsByUserId(userId) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/cuentas/usuario/${userId}`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AccountService.getAccountsByUserId:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'No se encontraron cuentas para este usuario'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async getAccountByNumber(accountNumber) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/cuentas/numero/${accountNumber}`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AccountService.getAccountByNumber:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'Cuenta no encontrada'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async getAccountById(accountId) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/cuentas/${accountId}`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AccountService.getAccountById:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'Cuenta no encontrada'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async createAccount(accountData) {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/cuentas`, accountData);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AccountService.createAccount:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error creando cuenta'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async updateAccountStatus(accountId, status) {
        try {
            const response = await axios.put(`${BACKEND_URL}/api/cuentas/${accountId}/estado`, {
                estado: status
            });
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AccountService.updateAccountStatus:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error actualizando estado de cuenta'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async getAllAccounts() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/cuentas`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AccountService.getAllAccounts:', error.message);
            
            return {
                success: false,
                message: 'Error obteniendo cuentas'
            };
        }
    }

    async deleteAccount(accountId) {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/cuentas/${accountId}`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en AccountService.deleteAccount:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'Cuenta no encontrada'
                };
            }
            
            return {
                success: false,
                message: 'Error eliminando cuenta'
            };
        }
    }
}

module.exports = new AccountService();