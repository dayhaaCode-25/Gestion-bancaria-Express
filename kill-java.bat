@echo off
echo
echo   CERRANDO APLICACION JAVA - PUERTO 8090
echo 
echo.

REM Buscar proceso que usa puerto 8090
echo Buscando proceso en puerto 8090...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8090') do (
    echo Matando proceso %%a en puerto 8090...
    taskkill /PID %%a /F
)

REM Buscar y matar procesos java relacionados con bancario
echo.
echo Buscando procesos Java de BancarioApplication...
tasklist /FI "IMAGENAME eq java.exe" /FO CSV | findstr /C:"java.exe" > nul
if errorlevel 1 (
    echo No hay procesos Java corriendo.
) else (
    echo Procesos Java encontrados. ¿Quieres cerrar TODOS los procesos Java? (S/N)
    set /p choice=
    if /i "%choice%"=="S" (
        echo Cerrando todos los procesos Java...
        taskkill /IM java.exe /F
    ) else (
        echo Proceso cancelado. Cierra manualmente el proceso de BancarioApplication desde tu IDE.
    )
)

echo.
echo ====================================
echo   VERIFICANDO PUERTOS LIBERADOS
echo ====================================
netstat -ano | findstr :8090
if errorlevel 1 (
    echo ✅ Puerto 8090 liberado correctamente
) else (
    echo ❌ Puerto 8090 aún ocupado
)

echo.
echo ====================================
echo   COMANDOS PARA REINICIAR
echo ====================================
echo 1. Desde VS Code: Ejecuta BancarioApplication.java
echo 2. Desde terminal: 
echo    cd "%~dp0"
echo    ./gradlew bootRun
echo 3. Desde Gradle: 
echo    gradle bootRun
echo.
pause