'use strict'

const express = require('express')
const router = express.Router()
const staticFiles = require('../lib/static-files-routes')

/* GET landing page. */
router.get('/', function (req, res, next) {
	res.render('landing/index', {
		title: 'Mishap Web',
		styles: staticFiles.cssLanding,
		javascripts: staticFiles.jsLanding
	})
})

module.exports = router
