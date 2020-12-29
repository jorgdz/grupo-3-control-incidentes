'use strict'

const express = require('express')
const router = express.Router()
const staticFiles = require('../lib/static-files-routes')

/* GET admin page. */
router.get('/', function (req, res, next) {
	res.render('admin/index', {
		title: 'Admin - Mishap Web',
		styles: staticFiles.cssAdmin,
		javascripts: staticFiles.jsAdmin
	})
})

router.get('/profile', function (req, res, next) {
	res.render('profile/index', {
		title: 'Perfil - Mishap Web',
		styles: staticFiles.cssProfile,
		javascripts: staticFiles.jsProfile
	})
})

module.exports = router
