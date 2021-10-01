
module.exports = function(sequelize, Sequelize) {

    const CategoriaMaterial = sequelize.define('categoria_materiales', {

        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }, {timestamps: false, underscored: true});

    return CategoriaMaterial;

}
