'use strict'
const { check, body } = require('express-validator')
const User = require('../../db').users

module.exports = [
  check('cedula').notEmpty().withMessage('La cédula es requerida.'),
  check('email').notEmpty().withMessage('El correo del usuario es requerido.'),
  check('fecha_nacimiento').isDate().withMessage('La fecha de nacimiento es inválida.'),
  body('email').isEmail().withMessage('El correo no tiene el formato correcto.'),
  check('cedula').custom((value, { req }) => {
    return User.findAll({
      where: {
        cedula: value
      }
    }).then(user => {
      if (user[0]) {
        throw new Error('La cédula ya está en uso.')
      }
    })
  }),
  check('email').custom((value, { req }) => {
    return User.findAll({
      where: {
        email: value
      }
    }).then(user => {
      if (user[0]) {
        throw new Error('El correo ya está en uso.')
      }
    })
  }),
  check('role_id').custom((value, { req }) => {
    if (value == 0 || value == '0') {
      throw new Error('Debe seleccionar un rol.')
    }

    return value
  }),
  check('villa_id').custom((value, { req }) => {
    if ((value == 0 || value == '0') && req.body.role_id == 3) {
      throw new Error('Debe seleccionar una villa.')
    }

    return value
  })
]
