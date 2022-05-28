const sql = require("./db");

const Jeu = function(jeu) {
    this.ID = jeu.ID_Jeu;
    this.titre = jeu.Titre;
    this.annee = jeu.Annee;
}

Jeu.getAll = (result) => {
    sql.query("SELECT ID_Jeu, Titre, Annee FROM Jeu", (error, resultQuery) => {
        if(error)
        {
            console.log(`Erreur : ${error}`);
            result(null, error);
        }
        else
        {
            console.log(`Jeu : ${resultQuery}`);
            result(null, resultQuery);
        }
    });
};

Jeu.getByID = (id, result) => {
    sql.query(`SELECT ID_Jeu, Titre, Annee FROM Jeu WHERE ID_Jeu = ${id}`, (error, resultQuery) => {
        if(error)
        {
            console.log(`Erreur : ${error}`);
            result(null, error);
        }
        else if(resultQuery.length)
        {
            console.log(`Jeu : ${resultQuery[0]}`);
            result(null, resultQuery[0]);
        }
        else
        {
            result({kind: "not_found"}, null);
        }
    });
};

module.exports = Jeu;