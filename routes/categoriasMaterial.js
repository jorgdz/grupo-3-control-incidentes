
const categoriaMaterialRouter = require('express').Router();

const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')

const CategoriaMaterial = require('../lib/db').categoriaMaterial;

categoriaMaterialRouter.get("/", auth, admin, async function(req, res) {
// categoriaMaterialRouter.get("/", async function(req, res) {

    let categorias = await CategoriaMaterial.findAll({order: [['id', 'DESC']]});

    res.render('categoria_materiales/index', {categorias});

});

categoriaMaterialRouter.get("/create", auth, admin, async function(req, res) {
// categoriaMaterialRouter.get("/create", async function(req, res) {

    res.render('categoria_materiales/create');

});

categoriaMaterialRouter.get("/create", auth, admin, async function(req, res) {
// categoriaMaterialRouter.get("/edit/:id", async function(req, res) {

    let categoria = await CategoriaMaterial.findByPk( parseInt(req.params.id) );
    
    res.render('categoria_materiales/edit', {categoria});

});

categoriaMaterialRouter.post("/", auth, admin, async function(req, res) {
// categoriaMaterialRouter.post("/", async function(req, res) {

    try {

        let nuevaCategoria = await CategoriaMaterial.create(req.body);
        
        req.flash('success', 'Categoría creada exitosamente');
        res.redirect('/categoria-materiales');

    } catch (err) {
        
        res.render('categoria_materiales/create', {error: true});
    
    }

});

categoriaMaterialRouter.post("/edit/:id", auth, admin, async function(req, res) {
// categoriaMaterialRouter.post("/edit/:id", async function(req, res) {

    try {

        let categoria = await CategoriaMaterial.findByPk(parseInt(req.params.id));
        await categoria.update(req.body);
        
        res.render('categoria_materiales/edit', {
            categoria,
            success: 'Categoría actualizada exitosamente',
        });
    
    } catch (err) {
        
        res.render('categoria_materiales/create', {error: true});
    
    }

});

categoriaMaterialRouter.post("/delete/:id", auth, admin, async function(req, res) {
// categoriaMaterialRouter.post("/delete/:id", async function(req, res) {

    try {
        
        await CategoriaMaterial.destroy({
            where: { id: parseInt(req.params.id) }
        });
    
        req.flash('success', 'Categoría borrada exitosamente');
        res.redirect('/categoria-materiales');
    
    } catch (err) {

        req.flash('error', 'No se pudo borrar la categoría');
        res.redirect('/categoria-materiales');

    }

});

module.exports = categoriaMaterialRouter;
