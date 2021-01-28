'use strict'
const { check } = require('express-validator')

module.exports = [
    check('nombres').notEmpty().withMessage('Los nombres son requeridos.'),
    check('apellidos').notEmpty().withMessage('Los apellidos son requeridos.'),
    check('username').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    check('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento es obligatoria.'),
]
