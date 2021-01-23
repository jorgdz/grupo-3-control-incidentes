'use strict'
const { body, check } = require('express-validator')

const messageConfirmPassword = 'La confirmación de la contraseña no coincide con la contraseña.'

module.exports = [
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error(messageConfirmPassword);
        }

        return true
    }).withMessage(messageConfirmPassword),
    check('password')
        .not()
        .isIn(['123', 'password', 'god'])
        .withMessage('No use una palabra común como contraseña')
        .matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
        .withMessage('La contraseña debe tener más de 10 caracteres y contener números, caracteres especiales, mayúsculas y minúsculas.')
]
