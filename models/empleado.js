'use strict'

module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleados', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    })

    return Empleado
}
