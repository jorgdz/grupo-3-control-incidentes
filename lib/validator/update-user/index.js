'use strict'
const { check, body } = require('express-validator')
const User = require('../../db').users
const { Op } = require('sequelize')

module.exports = [
  check('cedula').notEmpty().withMessage('La cédula es requerida.'),
  check('email').notEmpty().withMessage('El correo del usuario es requerido.'),
  check('username').notEmpty().withMessage('El nombre de usuario es requerido.'),
  body('email').isEmail().withMessage('El correo no tiene el formato correcto.'),
  check('cedula').custom((value, { req }) => {
    return User.findAll({
      where: {
        cedula: value,
        id: {
          [Op.not]: req.params.id
        }
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
        email: value,
        id: {
          [Op.not]: req.params.id
        }
      }
    }).then(user => {
      if (user[0]) {
        throw new Error('El correo ya está en uso.')
      }
    })
  }),
  check('username').custom((value, { req }) => {
    return User.findAll({
      where: {
        username: value,
        id: {
          [Op.not]: req.params.id
        }
      }
    }).then(user => {
      if (user[0]) {
        throw new Error('El nombre de usuario ya está en uso.')
      }
    })
  })
]
