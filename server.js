/*
* Tout est copié depuis ce tutoriel :
* https://www.bezkoder.com/node-js-rest-api-express-mysql/
*/

const express = require("express");
const cors = require("cors");

var corsOptions = {
    //Origine requêtes acceptées (port sur lequel tourne React)
    origin: "http://localhost:3000"
}

const appExpress = express();

appExpress.use(cors(corsOptions));
appExpress.use(express.json()); // parse requests of content-type - application/json
appExpress.use(express.urlencoded({extended: true})); // parse requests of content-type - application/x-www-form-urlencoded

// Route basique de test
appExpress.get("/", (request, result) => { 
    result.json({message:"JSON basique de test."});
});

// Set up PORT, Requête sur serveur
const PORT = process.env.PORT || 8080;
require("./database/routes/jeu.routes")(appExpress);
var server = appExpress.listen(PORT, () => {
    console.log(`Serveur tourne sur le port ${PORT}`);
});
server.setTimeout(0);
