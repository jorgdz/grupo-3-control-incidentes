'use strict'

const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const { residenteUsuarioFinal } = require('../middleware/residente-usuario-final')
const { isEmployee } = require('../middleware/empleado')
const db = require('../lib/db')
const Villa = require('../lib/db').villas
const Bloque = require('../lib/db').bloques
const Atencion = require('../lib/db').atenciones
const Incidente = require('../lib/db').incidentes
const Adjunto = require('../lib/db').adjuntos
const Residente = require('../lib/db').residentes
const User = require('../lib/db').users
const Empleado = require('../lib/db').empleados
const TipoIncidente = require('../lib/db').tipo_incidentes
const Comentario = require('../lib/db').comentarios
const SubComentario = require('../lib/db').subcomentarios
const { Op } = require('sequelize')

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

/* GET admin page. */
router.get('/', auth, async function (req, res, next) {
	let countAtentions = 0
	const lastIncidents = await Incidente.findAll({
		include:[
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
		], 
		order: [['id', 'DESC']],
		limit: 10
	});

	const gravityIncidents = await Incidente.findAll({
		where: {
			gravedad: db.Sequelize.where(db.Sequelize.col('tipo.gravedad'), { [Op.eq]: 'GRAVE' }),
		},
		include: [
			{
				model: TipoIncidente,
				as: 'tipo'
			}
		],
		order: [['id', 'DESC']],
	});

	if(req.user.role_id == 2) {
		countAtentions = await Atencion.count({ where: { empleado_id: req.user.empleado.id} })
		res.render('incidentes/index', { totalAtenciones: countAtentions, lastIncidents: lastIncidents, gravityIncidents: gravityIncidents })
	} else if (req.user.role_id == 3) {
		const tiposIncidentes = await TipoIncidente.findAll({ order: [['tipo', 'ASC']] })
		res.render('incidentes/index', { tipos: tiposIncidentes, lastIncidents: lastIncidents, gravityIncidents: gravityIncidents })
	} else {
		res.render('incidentes/index', { lastIncidents, gravityIncidents })
	}
})

/* GET incident page by id. */
router.get('/:id/incidente', auth, async function (req, res, next) {
	const incident = await Incidente.findAll(
	{
		where: { id: req.params.id },
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
										as: 'user',
										attributes: {
											exclude: ['password']
										}
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
								as: 'user',
								attributes: {
									exclude: ['password']
								}
							}
						]
					}
				]
			},
			{
				model: TipoIncidente,
				as: 'tipo'
			}
		]
	});

	res.render('incidentes/detail', { incident: incident[0] })
})

/* POST delete incidente. */
router.post('/incidente/:id/borrar', auth, residenteUsuarioFinal, async function (req, res, next) {
  await Incidente.destroy({ where: { id: req.params.id } })
  req.flash('success', 'Incidente borrado.')
  res.redirect('/valle-verde')
})

/**
 * 
 * Api Rest Get Incidents
 */
router.get('/api/incidentes', auth, async function (req, res, next) {
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
		order: [['id', 'DESC']]
	})

	res.send(incidentes).status(200)
})

/**
 * 
 * Api Rest Get Incidents for employee
 */
router.get('/api/incidentes/employee', auth, async function (req, res, next) {
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
		where: { estado: 'NO ATENDIDO' },
		order: [['id', 'DESC']]
	})

	res.send(incidentes).status(200)
})

/**
 * 
 * Api Rest Get user auth
 */
router.get('/api/auth/user', auth, async function (req, res, next) {
	res.send(req.user)
})

/**
 * 
 * Api Rest Post create incident
 */
router.post('/api/incident', auth, residenteUsuarioFinal, upload.array('file'), async function (req, res, next) {
	let response = []
	if (req.files.length > 0) {
		for await (let file of req.files) {
			response.push(await uploadOneFile(file, 'urbanizacion/'))
		}
	}

	let body = {
		descripcion: req.body.descripcion,
		tipo_id: req.body.tipo_incidente_id,
		detalles: req.body.detalles,
		residente_id: req.user.residente.id,
		estado: 'NO ATENDIDO'
	}

	if (response.length > 0) {
		body = {
			descripcion: req.body.descripcion,
			tipo_id: req.body.tipo_incidente_id,
			detalles: req.body.detalles,
			residente_id: req.user.residente.id,
			estado: 'NO ATENDIDO',
			adjuntos: response
		}
	}

	/**
	 * Save incident
	 */
	const incidentRegister = await Incidente.create(body, {
		include: [ {model: Adjunto, as: 'adjuntos'} ]
	})

	if (incidentRegister.id) {
		const lastIncident = await Incidente.findAll({ where: { id: incidentRegister.id }, 
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
		})
		res.send(lastIncident[0]).status(200)
	} else {
		res.send({
			error: 'Ha ocurrido un error al intentar publicar el incidente.'
		}).status(400)
	}
})

/**
 * 
 * Api Update incident
 */
router.put('/api/:id/incidentes', auth, residenteUsuarioFinal, async function (req, res, next) {
	let body = {
		descripcion: req.body.descripcion
	}

	const incidentUpdated = await Incidente.update(body, { where: { id: req.params.id }})
	if (incidentUpdated) {
		res.send(incidentUpdated)
	}
})

/**
 * 
 * Api Post Comments
 */
router.post('/api/comment/:id/incident', auth, residenteUsuarioFinal, async function (req, res, next) {
	let body = {
		descripcion: req.body.descripcion,
		incidente_id: req.params.id,
		residente_id: req.user.residente.id
	}

	const commented = await Comentario.create(body)
	if (commented) {
		const lastComment = await Comentario.findAll({ where: { id: commented.id }, 
			include: [{ 
				model: Residente, 
				as: 'residente',
				include: [
					{
						model: User,
						as: 'user'
					}
				]
			}]
		})
		res.send(lastComment[0])
	}
})

/**
 * Change status for attemp
 */
router.put('/api/:id/incidentes/attention', auth, isEmployee, async function (req, res, next) {
	await Incidente.update({ estado: 'ATENDIENDOSE' }, { where: { id: req.params.id }})
	
	let bodyAttend = {
		incidente_id : req.params.id,
		empleado_id: req.user.empleado.id
	}

	const attentionCreated = await Atencion.create(bodyAttend)
	if (attentionCreated) {
		const attendIncident = await Atencion.findAll({
			where: { id: attentionCreated.id },
			include: [
				{
					model: Incidente,
					as: 'incidente'
				},
				{
					model: Empleado,
					as: 'empleado',
					include: [
						{
							model: User,
							as: 'user',
							attributes: {
								exclude: ['password']
							}
						}
					]
				}
			]
		})
		
		res.send(attendIncident[0])
	}
})

/* Get my incidents. */
router.get('/api/my-incidents', auth, residenteUsuarioFinal , async function (req, res, next) {
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
		where: { residente_id: req.user.residente.id },
		order: [['id', 'DESC']]
	})

	res.send(incidentes)
		.status(200)
})

module.exports = router
