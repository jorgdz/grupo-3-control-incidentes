'use strict'

const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Mishap Web'})
})

module.exports = router
