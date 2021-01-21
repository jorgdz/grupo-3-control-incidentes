'use strict'
const { body } = require('express-validator')

module.exports = [
    body('email').isEmail().withMessage('El correo no es válido.'),
]
