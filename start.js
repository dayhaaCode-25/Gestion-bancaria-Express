


const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando servidor bancario...');
console.log('📁 Directorio:', __dirname);
console.log('⏰ Tiempo:', new Date().toLocaleString());

// Función para reiniciar el servidor automáticamente
function startServer() {
    console.log('\n🔄 Iniciando servidor Express...');
    
    const serverProcess = spawn('node', ['app.js'], {
        cwd: __dirname,
        stdio: 'inherit'
    });

    serverProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(`\n⚠️  Servidor cerrado con código: ${code}`);
            console.log('🔄 Reiniciando en 3 segundos...');
            setTimeout(startServer, 3000);
        } else {
            console.log('\n✅ Servidor cerrado correctamente');
        }
    });

    serverProcess.on('error', (error) => {
        console.error('\n❌ Error al iniciar servidor:', error);
        console.log('🔄 Reiniciando en 5 segundos...');
        setTimeout(startServer, 5000);
    });

    // Manejo de señales para cerrar correctamente
    process.on('SIGINT', () => {
        console.log('\n🛑 Cerrando servidor...');
        serverProcess.kill('SIGINT');
        process.exit(0);
    });

    return serverProcess;
}

// Verificar que Node.js tenga acceso a los módulos
try {
    require('./app.js');
    console.log('✅ Dependencias verificadas');
} catch (error) {
    console.error('❌ Error de dependencias:', error.message);
    process.exit(1);
}

// Iniciar el servidor
startServer();