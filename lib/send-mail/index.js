'use strict'

const mail = require('./mail')
const config = require('../../config/config').mail

module.exports = async function (userRegister, subject, template) {
  return await mail.sendMail({
    from: config.user,
    to: userRegister.email,
    subject: subject,
    html: template(userRegister)
  })
}
