import React from 'react'
import '../formulaire.css'
import { child, get, getDatabase, ref, push, update } from "firebase/database";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Composant représentant le formulaire de gestion d'un jeu (création, modification, suppression)
function FormulaireCreativeLab() {
    const database = getDatabase(), idMateriel = useParams()["id"];
    const [formulaire, setFormulaire] = useState({
        categorie: "JEU",
        nom: "",
        note: ""
    }); 

    //Au chargement du composant, si demande de modification d'un jeu (ID en URL), charger les informations du jeu
    useEffect(() => {
        if(idMateriel)
        {
            get(child(ref(database),`Materiel_Creative_Lab/${idMateriel}`))
            .then((snapshot) => {
                const materiel = snapshot.val();
                setFormulaire({
                    categorie: materiel.Categorie,
                    nom: materiel.Nom,
                    note: materiel.Note
                });
            });
            //TODO Gérer erreur requête
            //TODO Gérer absence materiel à cet ID
        }
    },[]);

    //Fonctions de gestion des données du formulaire
    const modificationFormulaire = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        formulaire[name] = value;
        setFormulaire({...formulaire});
    }

    //TODO Renvoyer vers nouvelle page à la fin de creerJeu
    //TODO Renvoyer vers nouvelle page à la fin de modifierJeu

    const creerMateriel = (event) => {
        event.preventDefault();

        //Créer jeu dans BDD avant de tenter uploads
        //Les valeurs FALSE sont des placeholders pour créer les champs "vides"
        //TODO Récupérer les valeurs des champs absents (admin)
        push(ref(database,`Materiel_Creative_Lab`), {
            Categorie: formulaire.categorie,
            Nom: formulaire.nom,
            Note: formulaire.note,
            Compte: false
        });

        //TODO Gérer erreur création jeu dans BDD
        /* 
        *   Si erreur :
        *       - Arrêter création ici
        *       - Afficher message d'erreur
        */

        alert(`Ajout de l'objet ${formulaire.nom} dans la base de données.`);
    }

    const modifierMateriel = (event) => {
        event.preventDefault();

        //Modification valeurs depuis champs texte
        update(ref(database, `Materiel_Creative_Lab/${idMateriel}`), {
            Categorie: formulaire.categorie,
            Nom: formulaire.nom,
            Note: formulaire.note
        });

        //TODO Gestion erreur de mise à jour

        alert(`Modification de l'objet ${formulaire.nom} dans la base de données.`);
    }

    return (
        <>
            <h1 className='form-titre'>Formulaire pour matériel du Creative Lab(tm)</h1>
            <form onSubmit={(idMateriel) ? modifierMateriel : creerMateriel} className='form'>
                <div className='form-ligne'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <div className='form-intro'>
                    <p>Vous êtes sur la page d'administration des jeux, vous pourrez modifier, ajouter ou retirer toutes informations plus tard.<br/>
                    Pour tout problème rencontré contacter </p>
                    <a href="mailto:ludhic.association@gmail.fr">ludhic.association@gmail.com</a>
                </div>

                <div className='form-component'>
                    <label htmlFor="nom">Nom du matériel* : </label>
                    <input name="nom" type="text" maxLength={64} required='required' onChange={modificationFormulaire} value={formulaire.nom}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="categorie">Catégorie* : </label>
                    {/* TODO Récupérer valeurs depuis une table pour gérer de façon plus simple et flexible ? */}
                    <select name="categorie" value={formulaire.categorie} onChange={modificationFormulaire}>
                        <option value='JEU'>Matériel de jeu</option>
                        <option value='INFORMATIQUE'>Matériel informatique</option>
                        <option value='KAKEMONO'>Un merveilleux Kakemono</option>
                    </select>
                </div>
                <div className='form-component'>
                    <label htmlFor="note">Notes sur l'objet* : </label>
                    <p className='form-texte'>Toute information nécessaire sur son état, sa façon de s'utiliser ou autre.</p>
                    <textarea name="note" cols="80" rows="3" type="text" maxLength={120} required='required' onChange={modificationFormulaire} value={formulaire.note}></textarea>
                </div>

                <p className='form-texte'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Envoyer le formulaire" />
                </div>


            </form>
        </>
    )
}

export default FormulaireCreativeLab