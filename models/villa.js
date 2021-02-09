'use strict'

module.exports = (sequelize, Sequelize) => {
  const Villa = sequelize.define('villas', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bloque_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    numero: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    referencia: {
      type: Sequelize.STRING
    },
    direccion: {
      type: Sequelize.STRING
    }
  })

  return Villa
}
