'use strict'

module.exports = (sequelize, Sequelize) => {
    const Bloque = sequelize.define('bloques', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })

    return Bloque
}
