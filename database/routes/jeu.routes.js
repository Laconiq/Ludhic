module.exports = appExpress => {
    const jeux = require("../controllers/jeu.controller");
    var router = require("express").Router();

    router.get("/", jeux.findAll);
    router.get("/:id", jeux.findByID);

    appExpress.use('/api/jeu', router);
}