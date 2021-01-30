'use strict'

exports.adminEmpleado = (req, res, next) => {
  if (req.user.role_id !== 3) {
    return next()
  }

  return res.redirect('/valle-verde')
}
