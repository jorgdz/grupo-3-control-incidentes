'use strict'
const { param } = require('express-validator')

module.exports = [
  param('id').isInt().withMessage('El id debe ser un número')
]
