'use strict'

exports.guest = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next()
    }

    return res.redirect('/valle-verde')
}
