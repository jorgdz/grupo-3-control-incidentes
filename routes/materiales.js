
const materialRouter = require('express').Router();

const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')

const Material = require('../lib/db').material;
const CategoriaMaterial = require('../lib/db').categoriaMaterial;
const { Op } = require('sequelize')

materialRouter.get("/", auth, admin, async function(req, res) {
//materialRouter.get("/", async function (req, res) {

    let materiales = await Material.findAll({
        order: [['id', 'desc']],
        include: {
            model: CategoriaMaterial,
            attributes: ['nombre'],
            as: 'categoria'
        }
    });
    
    res.render('materiales/index', { materiales });

});

materialRouter.get("/create", auth, admin, async function(req, res) {
//materialRouter.get("/create", async function (req, res) {

    let categorias = await CategoriaMaterial.findAll({
        order: [['nombre']]
    });

    res.render('materiales/create', { categorias });

});

materialRouter.get("/:id", auth, async function (req, res) {
    let materiales = await Material.findAll({
		where: { id_categoria: parseInt(req.params.id), 
			cantidad: {
				[Op.gt]: 0
			}
		},
		order: [['id', 'desc']]
    });
    
	res.send(materiales).status(200)
});

materialRouter.get("/edit/:id", auth, admin, async function(req, res) {
//materialRouter.get("/edit/:id", async function (req, res) {

    let datos = await Promise.all([
        CategoriaMaterial.findAll({ order: [['nombre']] }),
        Material.findOne({
            where: { id: parseInt(req.params.id) },
            include: {
                model: CategoriaMaterial,
                attributes: ['id'],
                as: 'categoria' 
            }
        })
    ]);

    res.render('materiales/edit', { 
        categorias: datos[0],
        material: datos[1]
    });

});

materialRouter.post("/", auth, admin, async function(req, res) {
//materialRouter.post("/", async function (req, res) {

    try {

        let nuevoMaterial = await Material.create(req.body);

        req.flash('success', 'Material creado exitosamente');
        res.redirect('/materiales');

    } catch (err) {

        req.flash('error', true);
        res.redirect('materiales/create');

    }

});

materialRouter.post("/edit/:id", auth, admin, async function(req, res) {
//materialRouter.post("/edit/:id", async function (req, res) {

    try {

        let material = await Material.findByPk(parseInt(req.params.id));
        await material.update(req.body);

        req.flash('success', 'Material actualizado exitosamente');
        res.redirect(`/materiales/edit/${req.params.id}`);

    } catch (err) {

        res.render('materiales/create', { error: true });

    }

});

materialRouter.post("/delete/:id", auth, admin, async function(req, res) {
//materialRouter.post("/delete/:id", async function (req, res) {

    try {

        await Material.destroy({
            where: { id: parseInt(req.params.id) }
        });

        req.flash('success', 'Material borrado exitosamente');
        res.redirect('/materiales');

    } catch (err) {

        req.flash('error', 'No se pudo borrar el material');
        res.redirect('/materiales');

    }

});

module.exports = materialRouter;
