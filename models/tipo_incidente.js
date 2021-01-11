'use strict'

module.exports = (sequelize, Sequelize) => {
    const TipoIncidente = sequelize.define('tipo_incidentes', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gravedad: {
            type: Sequelize.ENUM('GRAVE', 'NO TAN GRAVE', 'LEVES', 'NO CATEGORIZADO'),
        }
    }, {
        timestamps: false
    })

    return TipoIncidente
}
