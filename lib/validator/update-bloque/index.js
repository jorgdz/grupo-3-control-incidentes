'use strict'
const { check } = require('express-validator')
const Bloque = require('../../db').bloques
const { Op } = require('sequelize')

module.exports = [
  check('nombre').notEmpty().withMessage('El nombre del bloque es requerido.'),
  check('nombre').custom((value, { req }) => {
    return Bloque.findAll({
      where: {
        nombre: value,
        id: {
          [Op.not]: req.params.id
        }
      }
    }).then(user => {
      if (user[0]) {
        throw new Error('El nombre del bloque ya está en uso.')
      }
    })
  })
]
