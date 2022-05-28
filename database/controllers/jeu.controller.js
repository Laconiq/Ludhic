const Jeu = require("../models/jeu.model");

exports.findAll = (request, result) => {
    Jeu.getAll((error, data) => {
        if(error) result.status(500).send({message: error.message || "Erreur dans la requête de tous les jeux."});
        else result.send(data);
    });
}

exports.findByID = (request, result) => {
    Jeu.getByID(request.params.id, (error, data) => {
        if(error) 
        {
            if(error.kind === "not_found") result.status(404).send({message: `Aucun jeu avec l'ID ${request.params.id}`});
            else  result.status(500).send({message: `Erreur dans la requête du jeu ${request.params.id}.`});
        }
        else result.send(data);
    });
}