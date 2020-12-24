'use strict'

const config = require('../../config/config').db
const Sequelize = require('sequelize')
const setupDatabase = require('./db')

const sequelize = setupDatabase(config)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


module.exports = db
