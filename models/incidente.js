'use strict'

module.exports = (sequelize, Sequelize) => {
    const Incidente = sequelize.define('incidentes', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: Sequelize.TEXT,
        },
        tipo_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        detalles: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        residente_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return Incidente
}
