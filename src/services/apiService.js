// Servicio API con Axios para comunicación con backend Java/Spring
const axios = require('axios');

class ApiService {
    constructor() {
        // Configurar instancia base de Axios
        this.api = axios.create({
            baseURL: process.env.BACKEND_API_URL || 'http://localhost:8090',
            timeout: 10000, 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Interceptor para requests
        this.api.interceptors.request.use(
            (config) => {
                console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('❌ Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Interceptor para responses
        this.api.interceptors.response.use(
            (response) => {
                console.log(`✅ API Response: ${response.status} ${response.config.url}`);
                return response;
            },
            (error) => {
                console.error('❌ Response Error:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    /**
     * Login de usuario
     * @param {string} usuario - Nombre de usuario
     * @param {string} password - Contraseña
     * @returns {Promise} Respuesta del login
     */
    async login(usuario, password) {
        try {
            const response = await this.api.post('/api/login', {
                usuario,
                password
            });
            return {
                success: true,
                data: response.data,
                message: 'Login exitoso'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Error de conexión',
                status: error.response?.status
            };
        }
    }

    /**
     * Registro de usuario
     * @param {Object} userData - Datos del usuario
     * @returns {Promise} Respuesta del registro
     */
    async register(userData) {
        try {
            const response = await this.api.post('/api/register', userData);
            return {
                success: true,
                data: response.data,
                message: 'Usuario registrado exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Error en el registro',
                status: error.response?.status
            };
        }
    }

    /**
     * Validar token de usuario
     * @param {string} token - Token a validar
     * @returns {Promise} Respuesta de la validación
     */
    async validateToken(token) {
        try {
            const response = await this.api.post('/api/auth/validate', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return {
                success: true,
                data: response.data,
                message: 'Token válido'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Token inválido',
                status: error.response?.status
            };
        }
    }

   
    /**
     * Obtener todos los usuarios
     * @returns {Promise} Lista de usuarios
     */
    async getUsuarios() {
        try {
            const response = await this.api.get('/api/usuarios');
            return {
                success: true,
                data: response.data,
                message: 'Usuarios obtenidos exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: [],
                message: error.response?.data?.message || 'Error al obtener usuarios',
                status: error.response?.status
            };
        }
    }

    /**
     * Obtener usuario por ID
     * @param {number} id - ID del usuario
     * @returns {Promise} Datos del usuario
     */
    async getUsuarioById(id) {
        try {
            const response = await this.api.get(`/api/usuarios/${id}`);
            return {
                success: true,
                data: response.data,
                message: 'Usuario encontrado'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Usuario no encontrado',
                status: error.response?.status
            };
        }
    }


    /**
     * Obtener cuentas del usuario
     * @param {number} usuarioId - ID del usuario
     * @returns {Promise} Lista de cuentas
     */
    async getCuentasByUsuario(usuarioId) {
        try {
            const response = await this.api.get(`/api/cuentas/usuario/${usuarioId}`);
            return {
                success: true,
                data: response.data,
                message: 'Cuentas obtenidas exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: [],
                message: error.response?.data?.message || 'Error al obtener cuentas',
                status: error.response?.status
            };
        }
    }

    /**
     * Crear nueva cuenta bancaria
     * @param {Object} cuentaData - Datos de la cuenta
     * @returns {Promise} Cuenta creada
     */
    async crearCuenta(cuentaData) {
        try {
            const response = await this.api.post('/api/cuentas', cuentaData);
            return {
                success: true,
                data: response.data,
                message: 'Cuenta creada exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Error al crear cuenta',
                status: error.response?.status
            };
        }
    }



    /**
     * Obtener historial de transacciones
     * @param {number} cuentaId - ID de la cuenta
     * @returns {Promise} Lista de transacciones
     */
    async getTransacciones(cuentaId) {
        try {
            const response = await this.api.get(`/api/transacciones/cuenta/${cuentaId}`);
            return {
                success: true,
                data: response.data,
                message: 'Transacciones obtenidas exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: [],
                message: error.response?.data?.message || 'Error al obtener transacciones',
                status: error.response?.status
            };
        }
    }

    /**
     * Realizar depósito
     * @param {number} cuentaId - ID de la cuenta
     * @param {number} monto - Monto a depositar
     * @param {string} descripcion - Descripción del depósito
     * @returns {Promise} Resultado del depósito
     */
    async depositar(cuentaId, monto, descripcion = 'Depósito') {
        try {
            const response = await this.api.post('/api/transacciones/deposito', {
                cuentaId,
                monto,
                descripcion
            });
            return {
                success: true,
                data: response.data,
                message: 'Depósito realizado exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Error al realizar depósito',
                status: error.response?.status
            };
        }
    }

    /**
     * Realizar retiro
     * @param {number} cuentaId - ID de la cuenta
     * @param {number} monto - Monto a retirar
     * @param {string} descripcion - Descripción del retiro
     * @returns {Promise} Resultado del retiro
     */
    async retirar(cuentaId, monto, descripcion = 'Retiro') {
        try {
            const response = await this.api.post('/api/transacciones/retiro', {
                cuentaId,
                monto,
                descripcion
            });
            return {
                success: true,
                data: response.data,
                message: 'Retiro realizado exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Error al realizar retiro',
                status: error.response?.status
            };
        }
    }

    /**
     * Realizar transferencia
     * @param {number} cuentaOrigenId - ID cuenta origen
     * @param {number} cuentaDestinoId - ID cuenta destino
     * @param {number} monto - Monto a transferir
     * @param {string} descripcion - Descripción de la transferencia
     * @returns {Promise} Resultado de la transferencia
     */
    async transferir(cuentaOrigenId, cuentaDestinoId, monto, descripcion = 'Transferencia') {
        try {
            const response = await this.api.post('/api/transacciones/transferencia', {
                cuentaOrigenId,
                cuentaDestinoId,
                monto,
                descripcion
            });
            return {
                success: true,
                data: response.data,
                message: 'Transferencia realizada exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: error.response?.data?.message || 'Error al realizar transferencia',
                status: error.response?.status
            };
        }
    }


    /**
     * Verificar conectividad con el backend
     * @returns {Promise} Estado de la conexión
     */
    async checkHealth() {
        try {
            const response = await this.api.get('/api/health');
            return {
                success: true,
                data: response.data,
                message: 'Backend conectado correctamente'
            };
        } catch (error) {
            return {
                success: false,
                data: null,
                message: 'Backend no disponible',
                status: error.response?.status || 'NETWORK_ERROR'
            };
        }
    }
}

module.exports = new ApiService();