'use strict'

module.exports = (sequelize, Sequelize) => {
    const Residente = sequelize.define('residentes', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        verificado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return Residente
}
