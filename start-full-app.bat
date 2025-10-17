@echo off
echo ============================================
echo     GESTOR BANCARIO - INICIO COMPLETO
echo ============================================
echo.
echo Iniciando Frontend Express (Puerto 3002)...
echo Iniciando Backend Java (Puerto 8090)...
echo.
echo ============================================
echo   URLs DE ACCESO:
echo ============================================
echo   Frontend (Recomendado): http://localhost:3002
echo   Backend (API):          http://localhost:8090
echo   Backend (Interfaz):     http://localhost:8090/login.html
echo.
echo ============================================
echo   CREDENCIALES DE PRUEBA:
echo ============================================
echo   Admin:     admin / 1234
echo   Demo:      demo / demo123
echo.
echo Presiona Ctrl+C para detener ambos servidores
echo ============================================
echo.

REM Iniciar Backend Java en una nueva ventana
start "Backend Java - Puerto 8090" cmd /k "gradlew.bat bootRun"

REM Esperar un poco para que el backend inicie
timeout /t 5 /nobreak > nul

REM Iniciar Frontend Express
echo Iniciando Frontend Express...
node app.js

pause