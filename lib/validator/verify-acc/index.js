'use strict'
const { param } = require('express-validator')

module.exports = [
    param('id').isInt().withMessage('El id debe ser un número'),
    param('token').notEmpty().withMessage('El token es requerido.'),  
]
