'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')

/* GET admin page. */
router.get('/', auth, function (req, res, next) {
	res.render('incidentes/index')
})

module.exports = router
