const express = require('express');
const router = express.Router();
const authService = require('../services/authService');


// POST /api/auth/register - Registrar usuario
router.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        
        const result = await authService.register(userData);
        
        if (result.success) {
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: result.data
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// POST /api/auth/logout - Cerrar sesión
router.post('/logout', (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Sesión cerrada exitosamente'
        });
    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;