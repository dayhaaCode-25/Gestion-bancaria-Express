// Configuración del lado del cliente
const clientConfig = {
    API_BASE_URL: 'http://localhost:8090', 
    ENDPOINTS: {
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        USERS: '/api/usuarios',
        ACCOUNTS: '/api/cuentas',
        TRANSACTIONS: '/api/transacciones'
    }
};

function buildApiUrl(endpoint) {
    return clientConfig.API_BASE_URL + endpoint;
}

// Función para hacer fetch a la API del backend
async function apiCall(endpoint, options = {}) {
    const url = buildApiUrl(endpoint);
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, finalOptions);
        return response;
    } catch (error) {
        console.error('Error en API call:', error);
        throw error;
    }
}