'use strict'

const express = require('express')
const router = express.Router()
const staticFiles = require('../lib/static-files-routes')
const db = require('../lib/db')
const user = require('../models/user')
const Role = db.role
const User = db.users

const Op = db.Sequelize.Op;

/* GET admin page. */
router.get('/', function (req, res, next) {
	res.render('admin/index', {
		title: 'Admin - Mishap Web',
		styles: staticFiles.cssAdmin,
		javascripts: staticFiles.jsAdmin
	})
})

/* GET profile user. */
router.get('/profile', function (req, res, next) {
	res.render('profile/index', {
		title: 'Perfil - Mishap Web',
		styles: staticFiles.cssProfile,
		javascripts: staticFiles.jsProfile
	})
})

module.exports = router
