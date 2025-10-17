const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Importar rutas
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const accountRoutes = require('./src/routes/accounts');
const transactionRoutes = require('./src/routes/transactions');


app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.locals.API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8090';
    next();
});

// Rutas principales
app.get('/', (req, res) => {
    res.render('login-simple', { 
        title: 'Iniciar Sesión - Gestor Bancario',
        layout: false
    });
});

app.get('/registro', (req, res) => {
    res.render('register', { 
        title: 'Registro - Gestor Bancario',
        layout: 'auth'
    });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { 
        title: 'Dashboard - Gestor Bancario'
    });
});

app.get('/test', (req, res) => {
    res.render('test-login', { 
        layout: false
    });
});

app.get('/test-config', (req, res) => {
    res.render('test-config', { 
        layout: false,
        PORT: process.env.PORT || 3002
    });
});

app.get('/test-axios', (req, res) => {
    res.render('test-axios', { 
        layout: false
    });
});

// Rutas de funcionalidades bancarias
app.get('/cuentas', (req, res) => {
    res.render('cuentas', { 
        layout: false
    });
});

app.get('/transacciones', (req, res) => {
    res.render('transacciones', { 
        layout: false
    });
});

app.get('/movimientos', (req, res) => {
    res.render('movimientos', { 
        layout: false
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// Verificación de conectividad
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Frontend Express funcionando correctamente',
        timestamp: new Date().toISOString(),
        backend: process.env.BACKEND_API_URL
    });
});

// Endpoint para verificar conexión con el backend
app.get('/api/backend-status', async (req, res) => {
    try {
        const axios = require('axios');
        const response = await axios.get(`${process.env.BACKEND_API_URL}/actuator/health`, {
            timeout: 5000
        });
        res.json({ 
            backend: 'connected', 
            status: response.data,
            url: process.env.BACKEND_API_URL
        });
    } catch (error) {
        res.json({ 
            backend: 'disconnected', 
            error: error.message,
            url: process.env.BACKEND_API_URL,
            demo_mode: true
        });
    }
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Página no encontrada'
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error del servidor',
        error: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('❌ Error no capturado:', error);
    // No cerrar el proceso, solo registrar el error
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
    // No cerrar el proceso, solo registrar el error
});

// Manejo de señales del sistema
process.on('SIGINT', () => {
    console.log('\n🛑 Servidor detenido por el usuario (Ctrl+C)');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Servidor detenido por señal del sistema');
    process.exit(0);
});

module.exports = app;