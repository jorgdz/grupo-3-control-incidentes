'use strict'
const { check } = require('express-validator')
const Villa = require('../../db').villas

module.exports = [
  check('numero').notEmpty().withMessage('El número de la villa es requerida.'),
  check('numero').isLength({ max:10 }).withMessage('El número de la villa no debe tener más de 10 caracteres.'),
  check('numero').custom((value, { req }) => {
    return Villa.findAll({
      where: {
        numero: value
      }
    }).then(user => {
      if (user[0]) {
        throw new Error('El número de la villa ingresado ya existe en el sistema.')
      }
    })
  }),
  check('bloque_id').custom((value, { req }) => {
    if (value == 0 || value == '0') {
      throw new Error('Debe seleccionar un bloque.')
    }

    return value
  })
]
