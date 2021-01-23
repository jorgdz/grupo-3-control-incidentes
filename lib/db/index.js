'use strict'

const config = require('../../config/config').db
const Sequelize = require('sequelize')
const setupDatabase = require('./db')

const sequelize = setupDatabase(config)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.role = require('../../models/role')(sequelize, Sequelize)
db.users = require('../../models/user')(sequelize, Sequelize)
db.empleados = require('../../models/empleado')(sequelize, Sequelize)
db.residentes = require('../../models/residente')(sequelize, Sequelize)
db.tipo_incidentes = require('../../models/tipo_incidente')(sequelize, Sequelize)
db.incidentes = require('../../models/incidente')(sequelize, Sequelize)
db.adjuntos = require('../../models/adjunto')(sequelize, Sequelize)
db.atenciones = require('../../models/atencion')(sequelize, Sequelize)
db.comentarios = require('../../models/comentario')(sequelize, Sequelize)
db.subcomentarios = require('../../models/subcomentario')(sequelize, Sequelize)


db.role.hasMany(db.users, {
    foreignKey: 'role_id',
    as: 'users'
})
db.users.belongsTo(db.role, {
    onDelete: 'CASCADE',
    foreignKey: 'role_id',
    as: 'role',
})


db.users.hasOne(db.empleados, {
    foreignKey: 'user_id',
    as: 'empleado'
})
db.empleados.belongsTo(db.users, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
    as: 'user',
})
db.empleados.hasMany(db.atenciones, {
    foreignKey: 'empleado_id',
    as: 'atenciones'
})


db.users.hasOne(db.residentes, {
    foreignKey: 'user_id',
    as: 'residente'
})
db.residentes.belongsTo(db.users, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
    as: 'user',
})
db.residentes.hasMany(db.incidentes, {
    foreignKey: 'residente_id',
    as: 'incidentes'
})
db.residentes.hasMany(db.comentarios, {
    foreignKey: 'residente_id',
    as: 'comentarios'
})
db.residentes.hasMany(db.subcomentarios, {
    foreignKey: 'residente_id',
    as: 'subcomentarios'
})


db.tipo_incidentes.hasMany(db.incidentes, {
    foreignKey: 'tipo_id',
    as: 'incidentes'
})
db.incidentes.belongsTo(db.tipo_incidentes, {
    onDelete: 'CASCADE',
    foreignKey: 'tipo_id',
    as: 'tipo',
})
db.incidentes.belongsTo(db.residentes, {
    onDelete: 'CASCADE',
    foreignKey: 'residente_id',
    as: 'residente',
})
db.incidentes.hasMany(db.adjuntos, {
    foreignKey: 'incidente_id',
    as: 'adjuntos'
})
db.adjuntos.belongsTo(db.incidentes, {
    onDelete: 'CASCADE',
    foreignKey: 'incidente_id',
    as: 'incidente',
})
db.incidentes.hasMany(db.atenciones, {
    foreignKey: 'incidente_id',
    as: 'atenciones'
})
db.incidentes.hasMany(db.comentarios, {
    foreignKey: 'incidente_id',
    as: 'comentarios'
})
db.atenciones.belongsTo(db.incidentes, {
    onDelete: 'CASCADE',
    foreignKey: 'incidente_id',
    as: 'incidente',
})
db.atenciones.belongsTo(db.empleados, {
    onDelete: 'CASCADE',
    foreignKey: 'empleado_id',
    as: 'empleado',
})


db.comentarios.belongsTo(db.residentes, {
    onDelete: 'CASCADE',
    foreignKey: 'residente_id',
    as: 'residente',
})
db.comentarios.belongsTo(db.incidentes, {
    onDelete: 'CASCADE',
    foreignKey: 'incidente_id',
    as: 'incidente',
})
db.comentarios.hasMany(db.subcomentarios, {
    foreignKey: 'comentario_id',
    as: 'subcomentarios'
})


db.subcomentarios.belongsTo(db.comentarios, {
    onDelete: 'CASCADE',
    foreignKey: 'comentario_id',
    as: 'comentario',
})
db.subcomentarios.belongsTo(db.residentes, {
    onDelete: 'CASCADE',
    foreignKey: 'residente_id',
    as: 'residente',
})


module.exports = db
