const express = require('express');
const router = express.Router();
const accountService = require('../services/accountService');

// GET /api/accounts/:userId - Obtener cuentas de un usuario
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await accountService.getAccountsByUserId(userId);
        
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
        console.error('Error obteniendo cuentas:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// GET /api/accounts/account/:accountNumber - Obtener cuenta por número
router.get('/account/:accountNumber', async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        const result = await accountService.getAccountByNumber(accountNumber);
        
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
        console.error('Error obteniendo cuenta:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// POST /api/accounts - Crear nueva cuenta
router.post('/', async (req, res) => {
    try {
        const accountData = req.body;
        const result = await accountService.createAccount(accountData);
        
        if (result.success) {
            res.status(201).json({
                success: true,
                message: 'Cuenta creada exitosamente',
                data: result.data
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error creando cuenta:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// PUT /api/accounts/:accountId/status - Actualizar estado de cuenta
router.put('/:accountId/status', async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const { status } = req.body;
        
        const result = await accountService.updateAccountStatus(accountId, status);
        
        if (result.success) {
            res.json({
                success: true,
                message: 'Estado de cuenta actualizado exitosamente',
                data: result.data
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error actualizando estado de cuenta:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;