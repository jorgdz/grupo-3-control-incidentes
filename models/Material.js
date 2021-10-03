
module.exports = function(sequelize, Sequelize) {

    const Material = sequelize.define('materiales', {

        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },

        cantidad: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate: {min: 0}
        },

        id_categoria: {
            type: Sequelize.INTEGER,
            allowNull: false
        }

    }, {timestamps: false, undescored: true});

    return Material;

}
