const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8080';

class TransactionService {
    async getTransactionsByAccountId(accountId, limit = 10, offset = 0) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/transacciones/cuenta/${accountId}`, {
                params: { limit, offset }
            });
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en TransactionService.getTransactionsByAccountId:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'No se encontraron transacciones para esta cuenta'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async getTransactionById(transactionId) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/transacciones/${transactionId}`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en TransactionService.getTransactionById:', error.message);
            
            if (error.response && error.response.status === 404) {
                return {
                    success: false,
                    message: 'Transacción no encontrada'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async deposit(accountId, amount, description = 'Depósito') {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/transacciones/deposito`, {
                cuentaId: accountId,
                monto: amount,
                descripcion: description
            });
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en TransactionService.deposit:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error realizando depósito'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async withdraw(accountId, amount, description = 'Retiro') {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/transacciones/retiro`, {
                cuentaId: accountId,
                monto: amount,
                descripcion: description
            });
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en TransactionService.withdraw:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error realizando retiro'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async transfer(fromAccountId, toAccountNumber, amount, description = 'Transferencia') {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/transacciones/transferencia`, {
                cuentaOrigenId: fromAccountId,
                cuentaDestinoNumero: toAccountNumber,
                monto: amount,
                descripcion: description
            });
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en TransactionService.transfer:', error.message);
            
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.message || 'Error realizando transferencia'
                };
            }
            
            return {
                success: false,
                message: 'Error de conexión con el servidor'
            };
        }
    }

    async getAllTransactions() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/transacciones`);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en TransactionService.getAllTransactions:', error.message);
            
            return {
                success: false,
                message: 'Error obteniendo transacciones'
            };
        }
    }

    async getTransactionHistory(accountId, startDate, endDate) {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/transacciones/historial/${accountId}`, {
                params: { 
                    fechaInicio: startDate,
                    fechaFin: endDate
                }
            });
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Error en TransactionService.getTransactionHistory:', error.message);
            
            return {
                success: false,
                message: 'Error obteniendo historial de transacciones'
            };
        }
    }
}

module.exports = new TransactionService();