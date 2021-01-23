'use strict'

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cedula: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        nombres: {
            type: Sequelize.STRING
        },
        apellidos: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: Sequelize.DATEONLY
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nombre_imagen: {
            type: Sequelize.TEXT,
        },
        url_imagen: {
            type: Sequelize.STRING,
        },     
        estado: {
            type: Sequelize.BOOLEAN,
        }
    })

    return User
}
