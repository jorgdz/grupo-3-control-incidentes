'use strict'

const express = require('express')
const router = express.Router()
const { guest } = require('../middleware/guest')

/* GET landing page. */
router.get('/', guest, function (req, res, next) {
	res.render('landing/index', { layout: 'app' })
})

module.exports = router
