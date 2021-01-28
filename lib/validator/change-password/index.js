'use strict'
const { body, check } = require('express-validator')
const messageConfirmPassword = 'La confirmación de la contraseña no coincide.'

module.exports = [
    check('new_password')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('No use una palabra común como contraseña')
        .matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
        .withMessage('La contraseña debe tener más de 10 caracteres y contener números, caracteres especiales, mayúsculas y minúsculas.'),
    check('old_password').notEmpty().withMessage('La contraseña es requerida.'),
    body('repeat_password').custom((value, { req }) => {
        if (value !== req.body.new_password) {
            throw new Error(messageConfirmPassword)
        }

        return true
    }).withMessage(messageConfirmPassword)
]
