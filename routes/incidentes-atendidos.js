'use strict'

const express = require('express')
const router = express.Router()
const url = require('url')
const { Op } = require('sequelize')
const { auth } = require('../middleware/auth')
const { isEmployee }  = require('../middleware/empleado')
const db = require('../lib/db')
const { Sequelize } = require('../lib/db')
const TipoIncidente = db.tipo_incidentes
const Incidente = db.incidentes
const Atencion = db.atenciones

/* GET employees incident. */
router.get('/', auth, isEmployee, async function (req, res, next) {
    res.render('incidentes/employee-incidents')
})

/* Api GET employess incident. */
router.get('/api/all', auth, isEmployee, async function (req, res, next) {
    let start = parseInt(url.parse(req.url, true).query.start)
    let length = parseInt(url.parse(req.url, true).query.length)
  
    let orderAtencion = []
  
    if (req.query.order[0].column == 0) {
      orderAtencion = [['id', req.query.order[0].dir]]
    } else if (req.query.order[0].column == 1) {
      orderAtencion = [[ { model: Incidente, as: 'incidente' }, 'descripcion', req.query.order[0].dir ]]
    } else if (req.query.order[0].column == 4) {
      orderAtencion = [[ { model: Incidente, as: 'incidente' }, 'estado', req.query.order[0].dir ]]
    }
  
    const countAtencion = await Atencion.count({ where: { empleado_id: req.user.empleado.id } })
        
    const atenciones = await Atencion.findAll({
        where: 
            Sequelize.and(
                { empleado_id: req.user.empleado.id },
                Sequelize.or(
                    { descripcion: db.Sequelize.where(db.Sequelize.col('incidente.descripcion'), { [Op.iLike]: `%${req.query.search.value}%` }) },
                    { tipo: db.Sequelize.where(db.Sequelize.col('incidente.tipo.tipo'), { [Op.iLike]: `%${req.query.search.value}%` }) },
                )
            ),
        include: [{ model: Incidente, as: 'incidente', include: [{ model: TipoIncidente, as: 'tipo' }] }],
        offset: start,
        limit: length,
        order: orderAtencion
    })

    res.send(JSON.stringify({
      'draw': parseInt(url.parse(req.url, true).query.draw),
      'recordsFiltered': countAtencion,
      'recordsTotal': countAtencion,
      'data': atenciones
    })).status(200)
})

module.exports = router
