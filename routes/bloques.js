'use strict'

const express = require('express')
const router = express.Router()
const url = require('url')
const { Op } = require('sequelize')
const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')
const db = require('../lib/db')
const Bloque = db.bloques
const validatorBloque = require('../lib/validator/update-bloque')
const validatorSaveBloque = require('../lib/validator/save-bloque')
const validateId = require('../lib/validator/validate-id')
const { validationResult } = require('express-validator')

/* GET bloques. */
router.get('/', auth, admin, function (req, res, next) {
  res.render('bloques/index')
})

/* GET create bloque. */
router.get('/create', auth, admin, function (req, res, next) {
  res.render('bloques/create')
})

/* POST save user. */
router.post('/save', auth, admin, validatorSaveBloque, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    req.flash('errorsValidator', errors.array())
    res.redirect('/bloques/create')
  } else {
    const bloqueRegister = await Bloque.create({
      nombre: req.body.nombre
    })

    if (bloqueRegister.id) { 
      req.flash('success', 'Bloque creado.')
      res.redirect('/bloques')
    } else {
      req.flash('error', 'Ha ocurrido un error al crear un bloque.')
      res.redirect('/bloques/create')
    }
  }
})

/* Get edit bloque by id. */
router.get('/:id/editar', auth, admin, validateId, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/bloques')
  } else {
    const bloque = await Bloque.findAll({ where: { id: req.params.id }})
    if(bloque.length > 0) {
      res.render('bloques/edit', { bloque: bloque[0] })
    } else {
      req.flash('error', 'Bloque no encontrado.')
      res.redirect('/bloques')
    }
  }
})

/* POST delete bloque. */
router.post('/:id/borrar', auth, admin, async function (req, res, next) {
  await Bloque.destroy({ where: { id: req.params.id } })
  req.flash('success', 'Bloque eliminado.')
  res.redirect('/bloques')
})

/* UPDATE bloque. */
router.post('/:id/update', auth, admin, validatorBloque, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/bloques')
  } else {
    const bloqueUpdated = await Bloque.update({ nombre: req.body.nombre }, { where: { id: req.params.id }})

    if (bloqueUpdated) {
      req.flash('success', 'Se ha modificado el nombre del bloque.')
      res.redirect('/bloques')
    }
  }
})

/* Api GET bloques. */
router.get('/api/all', auth, admin, async function (req, res, next) {
  let start = parseInt(url.parse(req.url, true).query.start)
  let length = parseInt(url.parse(req.url, true).query.length)
  
  const countBloques = await Bloque.count({})

  let columnOrder = req.query.order[0].column == 0 ? 'id' : 'nombre'

  const bloques = await Bloque.findAll({
    where: {
      [Op.or]:  [
        { nombre: { [Op.iLike]: `%${req.query.search.value}%` } },
      ]
    },
    offset: start,
    limit: length,
    order: [[columnOrder, req.query.order[0].dir]],
  })

  res.send(JSON.stringify({
    'draw': parseInt(url.parse(req.url, true).query.draw),
    'recordsFiltered': countBloques,
    'recordsTotal': countBloques,
    'data': bloques
  })).status(200)
})

module.exports = router
