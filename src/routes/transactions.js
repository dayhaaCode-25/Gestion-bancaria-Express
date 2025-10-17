const express = require('express');
const router = express.Router();
const transactionService = require('../services/transactionService');

// GET /api/transactions/:accountId - Obtener transacciones de una cuenta
router.get('/:accountId', async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const { limit = 10, offset = 0 } = req.query;
        
        const result = await transactionService.getTransactionsByAccountId(accountId, limit, offset);
        
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
        console.error('Error obteniendo transacciones:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// POST /api/transactions/deposit - Realizar depósito
router.post('/deposit', async (req, res) => {
    try {
        const { accountId, amount, description } = req.body;
        
        if (!accountId || !amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Cuenta y monto válido son requeridos'
            });
        }

        const result = await transactionService.deposit(accountId, amount, description);
        
        if (result.success) {
            res.status(201).json({
                success: true,
                message: 'Depósito realizado exitosamente',
                data: result.data
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error en depósito:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// POST /api/transactions/withdraw - Realizar retiro
router.post('/withdraw', async (req, res) => {
    try {
        const { accountId, amount, description } = req.body;
        
        if (!accountId || !amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Cuenta y monto válido son requeridos'
            });
        }

        const result = await transactionService.withdraw(accountId, amount, description);
        
        if (result.success) {
            res.status(201).json({
                success: true,
                message: 'Retiro realizado exitosamente',
                data: result.data
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error en retiro:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// POST /api/transactions/transfer - Realizar transferencia
router.post('/transfer', async (req, res) => {
    try {
        const { fromAccountId, toAccountNumber, amount, description } = req.body;
        
        if (!fromAccountId || !toAccountNumber || !amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Cuenta origen, cuenta destino y monto válido son requeridos'
            });
        }

        const result = await transactionService.transfer(fromAccountId, toAccountNumber, amount, description);
        
        if (result.success) {
            res.status(201).json({
                success: true,
                message: 'Transferencia realizada exitosamente',
                data: result.data
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error en transferencia:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// GET /api/transactions/transaction/:transactionId - Obtener transacción por ID
router.get('/transaction/:transactionId', async (req, res) => {
    try {
        const transactionId = req.params.transactionId;
        const result = await transactionService.getTransactionById(transactionId);
        
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
        console.error('Error obteniendo transacción:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;