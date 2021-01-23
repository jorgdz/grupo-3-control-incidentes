'use strict'

const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')

const db = require('../../lib/db')
const User = db.users
const Residente = db.residentes

const validatorVerifyAcc = require('../../lib/validator/verify-acc')

const { guest } = require('../../middleware/guest')

/* GET verify page. */
router.get('/verify/:id/:token', guest, validatorVerifyAcc, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.redirect('/')
  } else {
    const residente = await Residente.findAll({
      where: {
        user_id: req.params.id,
        verification_code: req.params.token
      }
    })
  
    if (residente[0]) {
      const userVerify = await User.update({ estado: true }, {
        where: { id: residente[0].user_id }
      })
      
      const residenteVerify = await Residente.update({ verification_code: '' }, {
        where: { id: residente[0].id }
      })
      
      if (userVerify && residenteVerify) {
        req.flash('success', 'Felicidades tu cuenta ha sido verificada, por favor ingresa con tus credenciales !!')
        res.redirect('/')
      }
    } else {
      res.redirect('/')
    }
  }
})

/* GET form reset pass page. */
router.get('/password/reset/:id/:token', guest, validatorVerifyAcc, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.redirect('/')
  } else {
    const residente = await Residente.findAll({
      where: {
        user_id: req.params.id,
        password_reset_code: req.params.token
      },
      include:[{
        model: User,
        as: 'user'
      }]
    })

    if(residente[0]) {
      res.render('auth/password-reset', {
        layout: 'app',
        _email: residente[0].user.email,
        _id: residente[0].user.id,
        urlback: req.url
      })
    } else {
       res.redirect('/')
    }
  }
})

module.exports = router
