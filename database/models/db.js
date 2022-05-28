const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Crée la connexion à la base de donnée du site
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
});

connection.connect(error => {
    if(error) throw error;
    console.log("Connexion à la base de donnée réussie.");
});

module.exports = connection;