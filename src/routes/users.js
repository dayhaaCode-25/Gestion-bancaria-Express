const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userService.getUserById(userId);
        
        if (result.success) {
            res.json({
                success: true,
                data: result.data
            });
        } else {
            res.status(404).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// PUT /api/users/:id - Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        
        const result = await userService.updateUser(userId, userData);
        
        if (result.success) {
            res.json({
                success: true,
                message: 'Usuario actualizado exitosamente',
                data: result.data
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// PUT /api/users/:id/password - Cambiar contraseña
router.put('/:id/password', async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Contraseña actual y nueva contraseña son requeridas'
            });
        }

        const result = await userService.changePassword(userId, currentPassword, newPassword);
        
        if (result.success) {
            res.json({
                success: true,
                message: 'Contraseña actualizada exitosamente'
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error cambiando contraseña:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;