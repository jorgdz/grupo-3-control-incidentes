'use strict'
const { body, check } = require('express-validator')
const db = require('../../db')
const User = db.users

const messageEmailUsed = 'El correo ya está en uso.'
const messageUsernameUsed = 'El nombre de usuario ya está en uso.'

module.exports = [
    body('email').isEmail().withMessage('El correo no tiene el formato correcto.'),
    check('username').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    check('email').custom(value => {
        return User.findAll({
            where: {
                email: value
            }
        }).then(user => {
            if (user[0]) {
                throw new Error(messageEmailUsed)
            }
        })
    }),
    check('username').custom(value => {
        return User.findAll({
            where: {
                username: value
            }
        }).then(user => {
            if (user[0]) {
                throw new Error(messageUsernameUsed)
            }
        })
    })
]
