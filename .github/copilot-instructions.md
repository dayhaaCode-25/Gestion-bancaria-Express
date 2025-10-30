# Banking System AI Coding Instructions

## Architecture Overview

This is a **dual-stack banking system** with separate frontend and backend:
- **Frontend**: Node.js/Express serving Handlebars templates (port 3002)
- **Backend**: Java Spring Boot REST API (port 8090)
- **Communication**: Axios-based service layer with demo fallback

## Key Architectural Patterns

### Demo-First Development
All views implement **demo mode fallback** when backend is unavailable:
```javascript
// Pattern found in all .hbs files
try {
    const response = await api.get('/cuentas');
    cuentas = response.data;
} catch (error) {
    console.log('Backend no disponible, usando datos demo...');
    cuentas = cuentasDemo; // Hardcoded fallback data
    modoDemo = true;
}
```

### Service Layer Pattern
- `src/services/apiService.js`: Singleton Axios client with interceptors
- Individual services (`authService.js`, `accountService.js`) extend ApiService
- All services return `{success: boolean, data: any, message: string}` format

### No-Layout Handlebars Architecture
- Templates use `layout: false` consistently in routes
- Full HTML documents in each `.hbs` file with embedded styles/scripts
- No shared layouts or partials directory usage (despite setup in app.js)

## Critical Development Workflows

### Starting the System
```bash
# Backend (Java Spring Boot)
./gradlew bootRun  # Port 8090

# Frontend (Express)
npm run dev        # Port 3002 (not 3000 despite package.json)
```

### Demo Credentials (hardcoded in login-simple.hbs)
- `admin/1234` - Admin user
- `demo/demo123` - Demo user  
- `dayhana/dayhana123` - Named user

### Environment Configuration
- `.env` contains actual config (port 3002, backend 8090)
- `.env.example` is template for other developers
- Backend URL configurable via `BACKEND_API_URL`

## File Organization Conventions

### Views Structure
```
src/views/
├── login-simple.hbs    # Entry point (no auth)
├── dashboard.hbs       # Main app with sidebar nav
├── cuentas.hbs        # Account management
├── transacciones.hbs  # Transactions (deposits/withdrawals)
└── movimientos.hbs    # Account movement history
```

### Services Structure  
```
src/services/
├── apiService.js      # Base Axios client (singleton)
├── authService.js     # Authentication logic
├── accountService.js  # Account CRUD operations
└── transactionService.js # Transaction processing
```

### Route Handlers
- All routes in `src/routes/*.js` call corresponding services
- Express routes serve `.hbs` templates with `layout: false`
- API routes under `/api/*` return JSON for AJAX calls

## Integration Patterns

### Frontend-Backend Communication
- Base URL: `http://localhost:8090` (configurable)
- Timeout: 10 seconds on all requests
- Request/response logging via Axios interceptors
- Graceful degradation to demo data on connection failures

### Handlebars Template Style
- Each template is fully self-contained HTML document
- Purple gradient theme: `#667eea` to `#764ba2`
- Glass morphism effects with `backdrop-filter: blur(10px)`
- Font Awesome icons throughout
- Responsive design with CSS Grid/Flexbox

### Data Flow Pattern
1. User interaction triggers JavaScript in template
2. Axios call to Express route (`/api/*`)
3. Express route calls service method
4. Service makes HTTP request to Java backend
5. On failure, fallback to hardcoded demo data
6. Update UI with results or error messages

## Project-Specific Conventions

### Error Handling
- Always provide demo fallback data in frontend
- Use try-catch with specific error logging patterns
- Show user-friendly Spanish error messages
- `mostrarError()` and `mostrarExito()` functions in each template

### Styling Patterns
- CSS variables for theme colors (rarely used, mostly inline styles)
- Glass morphism: `background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px)`
- Consistent button styles: `.btn`, `.btn-primary`, `.btn-secondary`
- Currency formatting: `formatearMoneda()` function in templates

### Naming Conventions
- Spanish function names: `mostrarCuentas()`, `cargarTransacciones()`
- Camel case for JavaScript: `cuentaSeleccionada`, `movimientosFiltrados`
- Kebab case for CSS classes: `account-card`, `movements-table`
- File names in Spanish: `cuentas.hbs`, `transacciones.hbs`

## Development Gotchas

- **Port Mismatch**: package.json shows 3000, but app runs on 3002 (.env override)
- **Backend Dependency**: Java backend must run first, frontend degrades gracefully
- **No Shared Templates**: Despite Handlebars layout setup, all templates are standalone
- **Demo Data**: Critical for development when backend unavailable
- **Spanish UI**: All user-facing text and function names in Spanish