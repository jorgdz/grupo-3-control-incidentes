'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const db = require('../lib/db')
const Comentario = db.comentarios

/* Send comment */
router.post('/send/:id/incidente', auth, async function (req, res, next) {
  if (req.body.descripcion == undefined || req.body.descripcion == '') {
    req.flash('error', 'Debes escribir un comentario')
    res.redirect(`/valle-verde/${req.params.id}/incidente`)
  } else {
    const commentCreated = await Comentario.create(
    {
      descripcion: req.body.descripcion,
      incidente_id: req.params.id,
      residente_id: req.user.residente.id
    })
    if (commentCreated) {
      res.redirect(`/valle-verde/${req.params.id}/incidente`)
    }
  }
})

/* Destroy comment */
router.post('/:id/destroy/:incident_id/incidente', auth, async function (req, res, next) {
  await Comentario.destroy({ where: { id: req.params.id } })
  res.redirect(`/valle-verde/${req.params.incident_id}/incidente`)
})

module.exports = router
