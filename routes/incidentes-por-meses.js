'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const { admin }  = require('../middleware/admin')
const db = require('../lib/db')
const { QueryTypes } = require('sequelize')
const pdf = require('html-pdf')
const templateIncidentsByMonthReport = require ('../views/reports/report-incidents-by-month') 

/* GET incidents by month. */
router.get('/', auth, admin, async function (req, res, next) {
    res.render('incidentes/incidents-by-month')
})

/* Api GET incidents by month. */
router.get('/api/:mes/all', auth, admin, async function (req, res, next) {
    const mes = req.params.mes

    const incidentes = await db.sequelize.query(
      `SELECT i.id, i.descripcion, i.detalles, i.residente_id, i.estado, i."createdAt", i."updatedAt", ti.tipo, ti.gravedad 
      FROM incidentes i inner join tipo_incidentes ti on ti.id = i.tipo_id WHERE EXTRACT(MONTH FROM "createdAt") = :mes;`,
      {
        replacements: { mes: mes },
        type: QueryTypes.SELECT
      }
    );

	res.send(incidentes).status(200)
})


/* Print incidents by month. */
router.get('/:mes/report', auth, admin, async function (req, res, next) {
  const mes = req.params.mes

  const incidentes = await db.sequelize.query(
    `SELECT i.id, i.descripcion, i.detalles, i.residente_id, i.estado, i."createdAt", i."updatedAt", ti.tipo, ti.gravedad 
    FROM incidentes i inner join tipo_incidentes ti on ti.id = i.tipo_id WHERE EXTRACT(MONTH FROM "createdAt") = :mes;`,
    {
      replacements: { mes: mes },
      type: QueryTypes.SELECT
    }
  )

  pdf.create(templateIncidentsByMonthReport(incidentes, mes)).toStream(function (err, stream) {
    if (err) return res.send(err);
    res.type('pdf');
    stream.pipe(res);
  });
})

module.exports = router
