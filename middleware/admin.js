'use strict'

exports.admin = (req, res, next) => {
  if (req.user.role_id === 1) {
    return next()
  }

  return res.redirect('/valle-verde')
}
