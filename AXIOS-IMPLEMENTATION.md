

### **Backend (Express Server)**
```javascript
// Usar el ApiService
const apiService = require('./src/services/apiService');

// Login
const result = await apiService.login('admin', '1234');

// Obtener cuentas
const cuentas = await apiService.getCuentasByUsuario(1);

// Realizar depósito
const deposito = await apiService.depositar(1, 1000, 'Depósito');
```

### **Frontend (Navegador)**
```javascript

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>


async function login() {
    try {
        const response = await axios.post('http://localhost:8090/api/login', {
            usuario: 'admin',
            password: '1234'
        });
        
        console.log('✅ Login exitoso:', response.data);
    } catch (error) {
        console.error('❌ Error:', error.response?.data?.message);
    }
}

axios.post('http://localhost:8090/api/login', { usuario: 'admin', password: '1234' })
    .then(response => console.log('✅ Éxito:', response.data))
    .catch(error => console.error('❌ Error:', error));
```



### **1. Mejor manejo de errores**
```javascript
if (!response.ok) throw new Error('Error');

// Ahora (Axios)
catch (error) {
    if (error.response) {
        // Error del servidor (4xx, 5xx)
    } else if (error.request) {
        // Error de red
    } else {
        // Error de configuración
    }
}
```

### **2. Configuración centralizada**
```javascript

this.api = axios.create({
    baseURL: 'http://localhost:8090',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});
```

### **3. Interceptores automáticos**
```javascript
// Logging automático de todas las peticiones
this.api.interceptors.request.use(config => {
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
    return config;
});
```


