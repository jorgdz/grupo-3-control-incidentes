'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const Atencion = require('../lib/db').atenciones

/* GET admin page. */
router.get('/', auth, async function (req, res, next) {
	const countAtentions = await Atencion.count({ where: { empleado_id: req.user.empleado.id} })
	res.render('incidentes/index', { totalAtenciones: countAtentions })
})

module.exports = router
