'use strict'

const express = require('express')
const router = express.Router()
const url = require('url')
const { Op } = require('sequelize')
const validateId = require('../lib/validator/validate-id')
const validateSaveVilla = require('../lib/validator/save-villa')
const validateUpdateVilla = require('../lib/validator/update-villa')
const { validationResult } = require('express-validator')
const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')
const db = require('../lib/db')
const Bloque = db.bloques
const Villa = db.villas

/* GET villas. */
router.get('/', auth, admin, function (req, res, next) {
  res.render('villas/index')
})

/* GET create villa. */
router.get('/create', auth, admin, async function (req, res, next) {
  const bloques = await Bloque.findAll({ order: [['nombre', 'ASC']] })
  res.render('villas/create', { bloques })
})

/* GET edit villa page. */
router.get('/:id/editar', auth, admin, async function (req, res, next) {
  const villa = await Villa.findAll({ where: {id: req.params.id }})
  const bloques = await Bloque.findAll({ order: [['nombre', 'ASC']] })

  if (villa.length > 0) {
    res.render('villas/edit', {villa: villa[0], bloques: bloques})
  } else {
    req.flash('error', 'Villa no encontrada.')
    res.redirect('/villas')
  }
})

/* POST Save villa. */
router.post('/save', auth, admin, validateSaveVilla, async function (req, res, next) {
   const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/villas/create')
  } else {
    const villaRegister = await Villa.create({
      bloque_id: req.body.bloque_id,
      numero: req.body.numero,
      referencia: req.body.referencia,
      direccion: req.body.direccion
    })

    if (villaRegister.id) {
      req.flash('success', 'Villa creada.')
      res.redirect('/villas')
    } else {
      req.flash('error', 'Ha ocurrido un error al crear una villa.')
      res.redirect('/villas/create')
    }
  }
})

/* POST update villa. */
router.post('/:id/update', auth, admin, validateUpdateVilla, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/villas')
  } else {
    const villaUpdated = await Villa.update({ 
      numero: req.body.numero, 
      referencia: req.body.referencia, 
      direccion: req.body.direccion, 
      bloque_id: req.body.bloque_id 
    }, { where: { id: req.params.id }})

    if (villaUpdated) {
      req.flash('success', 'Villa actualizada.')
      res.redirect('/villas')
    }
  }
})

/* POST delete villa. */
router.post('/:id/borrar', auth, admin, async function (req, res, next) {
  await Villa.destroy({ where: { id: req.params.id } })
  req.flash('success', 'Villa eliminada.')
  res.redirect('/villas')
})

/* Api GET villas. */
router.get('/api/all', auth, admin, async function (req, res, next) {
  let start = parseInt(url.parse(req.url, true).query.start)
  let length = parseInt(url.parse(req.url, true).query.length)

  let orderVilla = []

  if (req.query.order[0].column == 0) {
    orderVilla = [['id', req.query.order[0].dir]]
  } else if (req.query.order[0].column == 1) {
    orderVilla = [[ { model: Bloque, as: 'bloque' }, 'nombre', req.query.order[0].dir ]]
  } else if (req.query.order[0].column == 2) {
    orderVilla = [['numero', req.query.order[0].dir]]
  } else if (req.query.order[0].column == 3) {
    orderVilla = [['referencia', req.query.order[0].dir]]
  } else if (req.query.order[0].column == 4) {
    orderVilla = [['direccion', req.query.order[0].dir]]
  }

  const countVillas = await Villa.count({})

  const villas = await Villa.findAll({
    where: {
      [Op.or]: {
        nombre: db.Sequelize.where(db.Sequelize.col('bloque.nombre'), { [Op.iLike]: `%${req.query.search.value}%` }),
        numero: { [Op.iLike]: `%${req.query.search.value}%` },
        referencia: { [Op.iLike]: `%${req.query.search.value}%` },
        direccion: { [Op.iLike]: `%${req.query.search.value}%` },
      }
    },
    include: [{ model: Bloque, as: 'bloque' }],
    offset: start,
    limit: length,
    order: orderVilla
  })

  res.send(JSON.stringify({
    'draw': parseInt(url.parse(req.url, true).query.draw),
    'recordsFiltered': countVillas,
    'recordsTotal': countVillas,
    'data': villas
  })).status(200)
})

module.exports = router
