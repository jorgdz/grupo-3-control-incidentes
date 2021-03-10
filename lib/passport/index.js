'use strict'

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const db = require('../db')
const User = db.users
const Role = db.role
const Residente = db.residentes
const Empleado = db.empleados

const { Op } = require('sequelize')

exports.localStrategy = new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, function (req, username, password, done) {
	User.findAll({ where: { [Op.or]: [{ username: username }, { email: username }] }})
		.then(findUser => {
			return findUser[0]
		})
		.then(user => {
			if (!user.estado) {
				req.flash('old', {username: username})
				done(null, false, req.flash('error', 'Verifique su cuenta en su correo antes de iniciar sesión.'))
			} else {
				bcrypt.compare(password, user.password)
					.then(valid => {
						if (valid) {
							done(null, user)
						} else {
							req.flash('old', {username: username})
							done(null, false, req.flash('error', 'La contraseña es incorrecta.'))
						}
					})
			}
		})
		.catch(err => {
			console.log(err)
			done(null, false, req.flash('error', `No hemos encontrado un usuario que coincida con ${username}`))
		})
})

exports.serializeUser = function (user, done) {
	done(null, {
		id: user.id,
		email: user.email,
		username: user.username
	})
}

exports.deserializeUser = function (user, done) {
	User.findAll({
			where: {
				email: user.email
			},
			include: [
				{
					model: Role,
					as: 'role'
				}, 
				{
					model: Empleado,
					as: 'empleado'
				},
				{
					model: Residente,
					as: 'residente'
				}
			],
			attributes: {
				exclude: ['password']
			}
		})
		.then((user) => {
			done(null, user[0]);
		})
		.catch((err) => console.log(err))
}
