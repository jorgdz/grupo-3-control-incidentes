'use strict'

module.exports = (sequelize, Sequelize) => {
    const Adjunto = sequelize.define('adjuntos', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: Sequelize.TEXT,
        },
        name: {
            type: Sequelize.STRING,
        },
        incidente_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    })

    return Adjunto
}
