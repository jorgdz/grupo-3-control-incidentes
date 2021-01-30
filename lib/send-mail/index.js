'use strict'

const mail = require('./mail')
const config = require('../../config/config').mail

module.exports = async function (userRegister, subject, template) {
  return await mail.sendMail({
    to: userRegister.email,
    from: config.user,
    subject: subject,
    html: template(userRegister)
  })
}
