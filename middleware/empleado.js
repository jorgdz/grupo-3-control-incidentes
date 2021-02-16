'use strict'

exports.isEmployee = (req, res, next) => {
  if (req.user.role_id === 2) {
    return next()
  }

  return res.redirect('/valle-verde')
}
