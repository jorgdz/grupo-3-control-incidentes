'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const randomToken = require('rand-token')
const { validationResult } = require('express-validator')

const db = require('../../lib/db')
const User = db.users
const Residente = db.residentes

const send = require('../../lib/send-mail')
const templateResetPassword = require('../../lib/send-mail/templateResetPassword')

const validatorForgot = require('../../lib/validator/forgot')
const validatorReset = require('../../lib/validator/reset-password')

const { guest } = require('../../middleware/guest')

/***
 * Send mail for change password
 */
router.post('/reset', guest, validatorForgot, async function (req, res, next) {
  const code = randomToken.generate(30)
  
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/')
  } else {
    const user = await User.findAll({ where: { email: req.body.email }})

    if (user[0]) {
      if (user[0].role_id != 3) {
        req.flash('message', `No se ha encontrado un usuario "residente" con el correo ${req.body.email}.`)
        res.redirect('/') 
      } else {
        const residentUpdated = await Residente.update({ password_reset_code: code }, {
          where: { user_id: user[0].id }
        })

        if (residentUpdated) {
          const userReset = await User.findAll({
            include: [{
              model: Residente,
              as: 'residente'
            }],
            where: {
              id: user[0].id
            }
          })
          
          const sendEmail = await send(userReset[0], `${process.env.APP_NAME} - Cambio de Contraseña ✔`, templateResetPassword)
          
          if(sendEmail.messageId) {
            req.flash('message', 'Te hemos enviado un correo de reseteo de contraseña, por favor revisa tu bandeja de entrada o correo spam.')
            res.redirect('/') 
          }
        }
      }
    } else {
      req.flash('message', 'No hemos encontrado un correo válido para resetear la contraseña.')
      res.redirect('/')
    }
  }
})

/**
 * Change your password
 */
router.post('/change/:id', guest, validatorReset, async function (req, res, next) {
  const user = await User.findAll({
    where: {
      id: req.params.id,
      email: req.body.email
    }
  })
  
  if (user[0]) {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      req.flash('errorsValidator', errors.array())
      res.redirect(`/confirm${req.body.urlback}`)
    } else {
      const passwordEncrypt = await bcrypt.hash(req.body.password, 10)
    
      const userUpdated = await User.update({ password: passwordEncrypt }, {
        where: { id: user[0].id }
      })
      
      const residenteUpdated = await Residente.update({ password_reset_code: '' }, {
        where: { user_id: user[0].id }
      })
      
      if (userUpdated && residenteUpdated) {
        req.flash('success', 'Tu contraseña ha sido cambiada con éxito.')
        res.redirect('/') 
      }
    }
  } else {
    req.flash('message', 'Digite su correo para el cambio de contraseña.')
    res.redirect('/')
  }
})

module.exports = router
