'use strict'

module.exports = {
    binding: function(body, field) {
        if (body.length > 0) {
            return body[0][field] ? body[0][field] : ''
        }
        return ''
    },
    app_name: function() {
        return process.env.APP_NAME
    },
    current_year: function () {
        return new Date().getFullYear()
    },
    display_login: function(error, success) {
        if (error.length > 0 || success.length > 0) {
            return 'display: block;'
        }

        return 'display:none;'
    },
    display_forgot: function(errorsValidator, message) {
        if (errorsValidator.length > 0 || message.length > 0) {
            return 'display: block;'
        }

        return 'display:none;'
    },
    if_cond: function (v1, v2, options) {
        if(v1 == v2) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },
    if_not: function (v1, v2, options) {
        if(v1 !== v2) {   
            return options.fn(this)
        }
        return options.inverse(this)
    },
    sumTwoValue: function (v1, v2) {
        return v1 + v2
    },
    lessThan: function (number) {
        return parseInt(number) - 1
    }
}
