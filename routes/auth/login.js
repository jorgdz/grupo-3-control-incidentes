'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')

const { guest } = require('../../middleware/guest')

/* POST login page. */
router.post('/', guest, passport.authenticate('local', {
	successRedirect: '/valle-verde',
	failureRedirect: '/',
	badRequestMessage: 'Las credenciales son requeridas.',
	failureFlash: true
}))

module.exports = router
