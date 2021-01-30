'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const { admin }  = require('../middleware/admin')
const Role = require('../lib/db').role
const validateId = require('../lib/validator/validate-id')
const validateUpdateRol = require('../lib/validator/update-rol')
const { validationResult } = require('express-validator')

/* GET roles page. */
router.get('/', auth, admin, async function (req, res, next) {
  const roles = await Role.findAll({ order: [['name', 'asc']] })
  res.render('roles/index', { roles })
})

/* GET role by id. */
router.get('/:id/editar', auth, admin, validateId, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/roles')
  } else {
    const role = await Role.findAll({ where: { id: req.params.id }})
    if(role.length > 0) {
      res.render('roles/edit', { role: role[0] })
    } else {
      req.flash('error', 'Rol no encontrado.')
      res.redirect('/roles')
    }
  }
})

/* Update role by id. */
router.post('/:id/editar', auth, admin, validateUpdateRol, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/roles')
  } else {
    const rolUpdated = await Role.update({ name: req.body.name }, { where: { id: req.params.id }})

    if (rolUpdated) {
      req.flash('success', 'Se ha modificado el nombre del rol.')
      res.redirect('/roles')
    }
  }
})

module.exports = router
