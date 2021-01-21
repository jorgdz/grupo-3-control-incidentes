'use strict'

const Verifier = require('email-verifier')

module.exports = function (email) {
  return new Promise((resolve, reject) => {
    let verifier = new Verifier(process.env.WHOISXML_API_KEY)
    verifier.verify(email, (err, data) => {
      if (err) reject({error:'Invalid error'})
      resolve(data)
    })
  })
}
