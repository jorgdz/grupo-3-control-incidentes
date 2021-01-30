'use strict'
const { check } = require('express-validator')
const Role = require('../../db').role
const { Op } = require('sequelize')

module.exports = [
  check('name').notEmpty().withMessage('El nombre del rol es requerido.'),
  check('name').custom((value, { req }) => {
    return Role.findAll({
      where: {
        name: value,
        id: {
          [Op.not]: req.params.id
        } 
      }
    }).then(user => {
      if (user[0]) {
        throw new Error('El nombre del rol ya está en uso')
      }
    })
  })
]
