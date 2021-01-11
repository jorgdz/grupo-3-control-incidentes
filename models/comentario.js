'use strict'

module.exports = (sequelize, Sequelize) => {
    const Comentario = sequelize.define('comentarios', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        incidente_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        residente_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    })

    return Comentario
}
