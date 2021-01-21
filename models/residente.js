'use strict'

module.exports = (sequelize, Sequelize) => {
    const Residente = sequelize.define('residentes', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        verification_code: {
            type: Sequelize.STRING,
        },
        password_reset_code: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    })

    return Residente
}
