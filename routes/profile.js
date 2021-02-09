'use strict'

const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const { auth } = require('../middleware/auth')
const db = require('../lib/db')
const validatorUpdateProfile = require('../lib/validator/update-profile')
const validatorChangePass = require('../lib/validator/change-password')
const User = db.users
const Empleado = db.empleados
const Residente = db.residentes

const bcrypt = require('bcrypt')

const { generateFileName, uploadOneFile } = require('../lib/storage')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: '',
  filename: function (req, file, cb) {
    cb(null, generateFileName(file.originalname))
  },
})

const upload = multer({ 
  storage: storage,  
  limits: {
    fileSize: 5 * 1024 * 1024
  } 
})

/* GET profile user. */
router.get('/', auth, function (req, res, next) {
	res.render('profile/index')
})

/* GET settings profile user. */
router.get('/ajustes', auth, function (req, res, next) {
	res.render('profile/settings')
})

/* GET user profile. */
router.get('/usuario/:username', auth, async function (req, res, next) {
  const user = await User.findAll({ where: { username: req.params.username }, 
    include: [
      {
        model: Residente,
        as: 'residente'
      },
      {
        model: Empleado,
        as: 'empleado'
      }
    ]})

	res.render('profile/user', { profileUser: user[0] })
})

/* POST settings profile user. */
router.post('/ajustes', auth, validatorUpdateProfile, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/perfil/ajustes')
  } else {
    const userUpdated = await User.update({ nombres: req.body.nombres, apellidos: req.body.apellidos, username: req.body.username, fecha_nacimiento: req.body.fecha_nacimiento }, {
      where: { id: req.user.id }
    })

    if (userUpdated) {
      req.flash('success', 'Perfil actualizado.')
      res.redirect('/perfil/ajustes')
    }
  }
})

/* POST change password account. */
router.post('/contrasena', auth, validatorChangePass, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect('/perfil/ajustes')
  } else {
    const user = await User.findAll({ where : { id: req.user.id }})
    const valid = await bcrypt.compare(req.body.old_password, user[0].password)
    
    if(!valid) {
      req.flash('error', 'La contraseña es incorrecta.')
      res.redirect('/perfil/ajustes')
    } else {
      const passwordEncrypt = await bcrypt.hash(req.body.new_password, 10)
      const userUpdated = await User.update({ password: passwordEncrypt }, {
        where: { id: req.user.id }
      })

      if (userUpdated) {
        req.flash('success', 'La contraseña ha sido cambiada.')
        res.redirect('/perfil/ajustes')
      }
    }
  }
})

/* POST desactivate account. */
router.post('/desactive', auth, async function (req, res, next) {
  if (req.body.email !== req.user.email) {
    req.flash('error', 'El correo es incorrecto.')
    res.redirect('/perfil/ajustes')
  } else {
    const user = await User.findAll({ where : { email: req.body.email }})
    if (user.length > 0) {
      const valid = await bcrypt.compare(req.body.password, user[0].password)
      if (!valid) {
        req.flash('error', 'La contraseña es incorrecta.')
        res.redirect('/perfil/ajustes')
      } else {
        const userUpdated = await User.update({ estado: false }, {
          where: { email: user[0].email}
        })

        if(userUpdated) {
          req.logOut()
          res.redirect('/')
        }
      }
    }
  }
})

/* POST upload user picture. */
router.put('/api/foto', auth, upload.single('file'), async function (req, res, next) {
  const response = await uploadOneFile(req.file, 'urbanizacion/profile/')
  const userUpdated = await User.update({ nombre_imagen: response.name, url_imagen: response.url }, {
    where: { id: req.user.id }
  })

  if (userUpdated) {
    res.send(response)
  }
})

module.exports = router
