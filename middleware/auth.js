'use strict'

exports.auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  return res.redirect('/');
}
