'use strict'

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const hbs = require('express-handlebars')
var hbsExtend = require('express-handlebars-extend')
const myHbsHelpers = require('./lib/helper-hbs')

var indexRouter = require('./routes/index')
var adminRouter = require('./routes/admin')
var loginRouter = require('./routes/auth/login')
var resetPassRouter = require('./routes/auth/reset-password')
var verificationRouter = require('./routes/auth/verification')

const session = require('express-session')
const flash = require('connect-flash')

const app = express()

const db = require('./lib/db')

const passport = require('passport')
const auth = require('./lib/passport')

// view engine setup
var exhbs = hbsExtend(hbs.create({
  extname: 'hbs', 
  defaultLayout: 'layout',
  layoutsDir: `${__dirname}/views/layouts/`, 
  partialsDir: [`${__dirname}/views/partials`],
  helpers: myHbsHelpers
}))

app.engine('hbs', exhbs.engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  app.locals.message = req.flash('message')
  app.locals.success = req.flash('success')
  app.locals.error = req.flash('error')
  app.locals.errorsValidator = req.flash('errorsValidator')
  app.locals.old = req.flash('old')
  app.locals.user = req.user
  next()
})

db.sequelize.sync()

passport.use('local', auth.localStrategy)
passport.deserializeUser(auth.deserializeUser)
passport.serializeUser(auth.serializeUser)

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/confirm', verificationRouter)
app.use('/password', resetPassRouter)
app.use('/valle-verde', adminRouter)

app.post('/logout', function (req, res) {
  req.logOut()
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) { next(createError(404)) })

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
