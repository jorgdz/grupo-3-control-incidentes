'use strict'

const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const url = require('url')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const randomToken = require('rand-token')
const { auth } = require('../middleware/auth')
const { adminEmpleado }  = require('../middleware/admin-empleado')
const User = require('../lib/db').users
const Role = require('../lib/db').role
const Villa = require('../lib/db').villas
const Bloque = require('../lib/db').bloques
const Empleado = require('../lib/db').empleados
const Residente = require('../lib/db').residentes
const validateUpdateUser = require('../lib/validator/update-user')
const validateSaveUser = require('../lib/validator/save-user')
const { paginate } = require('../lib/util/paginate')
const realEmail = require('../lib/validator/real-email')
const send = require('../lib/send-mail')
const templateVerify = require('../lib/send-mail/templateVerify')
const templateNewAccountEmpl = require('../lib/send-mail/templateNewAccountEmpl')

/* GET users page. */
router.get('/', auth, adminEmpleado, async function (req, res, next) {
  let page = parseInt(url.parse(req.url, true).query.page) || 0
  let size = parseInt(url.parse(req.url, true).query.size) || 5
  let search = url.parse(req.url, true).query.search || ''
  let rol = parseInt(url.parse(req.url, true).query.rol) || 0

  let offset = page * size
  
  let where = {
    role_id: {
      [Op.not]: 1
    }
  }

  let include = [{
    model: Role,
    as: 'role'
  }]
  
  let whereOr = [
    { cedula: { [Op.iLike]: `%${search}%` } },
    { nombres: { [Op.iLike]: `%${search}%` } },
    { apellidos: { [Op.iLike]: `%${search}%` } },
    { email: { [Op.iLike]: `%${search}%` } },
    { username: { [Op.iLike]: `%${search}%` } },
  ]

  if ((search != undefined && search != '' && search != null && search != isNaN) || (rol != undefined && rol != '' && rol != 0 && rol != '0')) {
    if (rol != undefined && rol != '' && rol != null && rol != 0 && rol != '0') {
      where = {
        role_id: {
          [Op.eq]: rol,
          [Op.not]: 1
        },
        [Op.or]: whereOr,
      }
    } else {
      where = {
        role_id: {
          [Op.not]: 1
        },
        [Op.or]: whereOr,
      }
    }
  }

  let users = []
  let roles = []
  if (req.user.role_id === 1) {
    const data = await User.findAll({
      where: where,
      include: include,
      offset: offset,
      limit: size,
      order: [['id', 'DESC']],
    })

    if (data.length == 0) {
      const _data = await User.findAll({where: where, offset: 0, limit: size,})
      if (_data.length > 0) {
        res.redirect(`/usuarios?size=${size}&page=0&search=${search}&rol=${rol}`)
      }
    }

    const countUsers = await User.count({ where: where })
    users = paginate(page, size, countUsers, data)
    roles = await Role.findAll({ where:{id: { [Op.not]: 1}} })

  } else if (req.user.role_id == 2) {
    console.log(req.user.role_id)

    where = {
      role_id: {
        [Op.eq]: 3
      },
      [Op.or]: whereOr,
    }

    const data = await User.findAll({
      where: where,
      include: include,
      offset: offset,
      limit: size,
      order: [['id', 'DESC']],
    })

    rol = 3
    if (data.length == 0) {
      const _data = await User.findAll({where: where, offset: 0, limit: size,})
      if (_data.length > 0) {
        res.redirect(`/usuarios?size=${size}&page=0&search=${search}&rol=3`)
      }
    }

    const countUsers = await User.count({ where: where })
    users = paginate(page, size, countUsers, data)
    roles = await Role.findAll({ where:{id: { [Op.eq]: 3}} })
  }

  res.render('users/index', {
    users: users, 
    size: size,
    search: search,
    roles: roles,
    rol: rol
  })
})

/* GET edit users page. */
router.get('/:id/editar', auth, adminEmpleado, async function (req, res, next) {
  const user = await User.findAll({ where: {id: req.params.id }})
  const villas = await Villa.findAll({include: [{
    model: Bloque,
    as: 'bloque'
  }]})

  if (user.length > 0) {
    res.render('users/edit', {usuario: user[0], villas: villas})
  } else {
    req.flash('error', 'Usuario no encontrado.')
    res.redirect('/usuarios')
  }
})


/* GET edit users page. */
router.get('/create', auth, adminEmpleado, async function (req, res, next) {
  let where = {}
  if (req.user.role_id === 1) {
    where = {
      id: {[Op.not]: 1}
    }
  } else if (req.user.role_id === 2) {
    where = {
      id: {[Op.eq]: 3}
    }
  } else {
    res.redirect('/valle-verde')
  }

  const roles = await Role.findAll({ where: where})

  const villas = await Villa.findAll({include: [{
    model: Bloque,
    as: 'bloque'
  }]})

  res.render('users/create', { roles, villas })
})

/* POST delete users page. */
router.post('/:id/borrar', auth, adminEmpleado, async function (req, res, next) {
  await User.destroy({ where: { id: req.params.id } })
  req.flash('success', 'Se eliminado un usuario.')
  res.redirect('/usuarios')
})

/* POST update users. */
router.post('/:id/editar', auth, adminEmpleado, validateUpdateUser, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('errorsValidator', errors.array())
    res.redirect(`/usuarios/${req.params.id}/editar`)
  } else {
    const resultEmail = await realEmail(req.body.email)
    if (resultEmail.smtpCheck == 'false' || resultEmail.smtpCheck == false) {
      req.flash('error','Por favor proporcione un correo real.')
      res.redirect(`/usuarios/${req.params.id}/editar`)
    } else {
      let body = {
        cedula: req.body.cedula, 
        nombres: req.body.nombres, 
        apellidos: req.body.apellidos, 
        email: req.body.email, 
        fecha_nacimiento: req.body.fecha_nacimiento, 
        username: req.body.username, 
        estado: req.body.estado
      }

      if (req.body.reset) {
        const passwordEncrypt = await bcrypt.hash(req.body.cedula, 10)
        body.password = passwordEncrypt
      }

      const userUpdated = await User.update(body, { where: { id: req.params.id }})
      
      if (userUpdated) {
        req.flash('success', 'Usuario modificado.')
        res.redirect('/usuarios')
      } else {
        req.flash('error', 'Ha ocurrido un error al intentar modificar el usuario.')
        res.redirect(`/usuarios/${req.params.id}/editar`)
      }
    }
  }
})

/* POST save user. */
router.post('/save', auth, adminEmpleado, validateSaveUser, async function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    req.flash('errorsValidator', errors.array())
    res.redirect('/usuarios/create')
  } else {
    const resultEmail = await realEmail(req.body.email)
    if (resultEmail.smtpCheck == 'false' || resultEmail.smtpCheck == false) {
      req.flash('error','Por favor proporcione un correo real.')
      res.redirect('/usuarios/create')
    } else {
      const passwordEncrypt = await bcrypt.hash(req.body.cedula, 10)

      let _username = req.body.email.split('@')
      let _cedula = req.body.cedula.substr(1,4)

      let body = {
        cedula: req.body.cedula,
        email: req.body.email,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        username: `${_username[0]}${_cedula}`,
        password: passwordEncrypt,
        nombre_imagen: '1611597615500-user.png',
        url_imagen: 'https://storage.googleapis.com/istb-storage.appspot.com/1611597615500-user.png',
        fecha_nacimiento: req.body.fecha_nacimiento,
        role_id: parseInt(req.body.role_id),
        estado: false
      }

      if (req.body.role_id == 2 || req.body.role_id == '2') {
        body.estado = true
      }

      const userRegister = await User.create(body)
      var created = false
      if (userRegister.role_id == 2) {
        const emplRegister = await Empleado.create({ user_id: userRegister.id })
        const sendEmail = await send(userRegister, `${process.env.APP_NAME} - CREACIÓN DE CUENTA ✔`, templateNewAccountEmpl)
        if(sendEmail.messageId && emplRegister.id) {
          created = true
        }
      } else if (userRegister.role_id == 3) {
        const code = randomToken.generate(30)
        const residenteRegister = await Residente.create({ user_id: userRegister.id, verification_code: code, villa_id: parseInt(req.body.villa_id)})

        const userCreate = await User.findAll({ where: { id: userRegister.id }, 
          include: [{
            model: Residente,
            as: 'residente'
          }]
        })

        if (residenteRegister.id) {
          const sendEmail = await send(userCreate[0], `${process.env.APP_NAME} - VERIFICACIÓN DE CUENTA ✔`, templateVerify)
          if(sendEmail.messageId) {
            created = true
          }
        }
      }

      if (created) {
        req.flash('success', 'Usuario creado.')
        res.redirect('/usuarios')
      } else {
        req.flash('error', 'Ha ocurrido un error al crear un usuario.')
        res.redirect('/usuarios/create')
      }
    }
  }
})

module.exports = router
