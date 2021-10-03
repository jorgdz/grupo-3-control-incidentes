'use strict'

module.exports = (sequelize, Sequelize) => {
    const Atencion = sequelize.define('atenciones', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        incidente_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        empleado_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        material_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return Atencion
}
