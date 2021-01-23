const nodemailer = require('nodemailer')
const config = require('../../config/config').mail

var transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
        user: config.user,
        pass: config.pass
    }
})

module.exports = transporter
