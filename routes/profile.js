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
const Incidente = db.incidentes
const Villa = db.villas
const Bloque = db.bloques
const Residente = db.residentes
const Adjunto = db.adjuntos
const Comentario = db.comentarios
const SubComentario = db.subcomentarios
const TipoIncidente = db.tipo_incidentes
const { Op } = require('sequelize')

const bcrypt = require('bcrypt')

const { generateFileName, uploadOneFile } = require('../lib/storage')

const multer = require('multer')
const { residenteUsuarioFinal } = require('../middleware/residente-usuario-final')
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
    include: [{
      model: Residente,
      as: 'residente'
    },
    {
      model: Empleado,
      as: 'empleado'
    }]
  })

  if (user[0].id == req.user.id) {
    res.redirect('/perfil')
  }

  if(user.length > 0) {
    res.render('profile/user', { profileUser: user[0] })
  } else  {
    res.redirect('/valle-verde')
  }
})

/* Api GET user's incidents. */
router.get('/api/user-incidents/:username', auth, async function (req, res, next) {
  const incidentes = await Incidente.findAll({
		include: [
			{
				model: Residente,
				as: 'residente',
				include: [
					{
						model: User,
						as: 'user',
						attributes: {
							exclude: ['password']
						}
					},
					{
						model: Villa,
						as: 'villa',
						include: [{
							model: Bloque,
							as: 'bloque',
						}]
					}
				]
			},
			{
				model: Adjunto,
				as: 'adjuntos'
			},
			{
				model: Comentario,
				as: 'comentarios',
				include: [
					{
						model: SubComentario,
						as: 'subcomentarios',
						include: [
							{
								model: Residente,
								as: 'residente',
								include: [
									{
										model: User,
										as: 'user'
									}
								]
							}
						]
					},
					{
						model: Residente,
						as: 'residente',
						include: [
							{
								model: User,
								as: 'user'
							}
						]
					}
				]
			},
			{
				model: TipoIncidente,
				as: 'tipo'
			}
		],
		where: { username: db.Sequelize.where(db.Sequelize.col('residente.user.username'), { [Op.eq]: req.params.username })},
   	order: [['id', 'DESC']]
	})

	res.send(incidentes)
		.status(200)
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
