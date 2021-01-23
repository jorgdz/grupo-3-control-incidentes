'use strict'

module.exports = (sequelize, Sequelize) => {
    const Subcomentario = sequelize.define('subcomentarios', {
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
        comentario_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        residente_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    })

    return Subcomentario
}
