import React from 'react'
import './formulaire.css'
import { child, get, getDatabase, ref, push, update } from "firebase/database";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { modificationFormulaire } from '../../helpers/fonctionsFormulaires';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';

//Composant représentant le formulaire de gestion d'un jeu (création, modification, suppression)
function FormulaireRendu(props) {
    const [compte, setCompte] = useState(false);
    const navigate = useNavigate();
    const database = getDatabase(), idRendu = useParams()["id"];
    const [formulaire, setFormulaire] = useState({
        //Récupère date du jour même
        date: new Date().toISOString().split('T')[0],
        mail: "",
        prof: "",
        matiere: "",
        objet: "",
        formation: "MAJIC_M1"
        //TODO Rajouter l'année et la formation
    }); 

    useEffect(() => {
    setCompte(props.utilisateur);
    },[props]);

    useEffect(() => {
    //Si non connecté, renvoie à l'accueil automatiquement
    estConnecte(compte, true, navigate);
    },[compte]);

    //Au chargement du composant, si demande de modification d'un jeu (ID en URL), charger les informations du jeu
    useEffect(() => {
        if(idRendu)
        {
            get(child(ref(database),`Rendu/${idRendu}`))
            .then((snapshot) => {
                const rendu = snapshot.val();
                setFormulaire({
                    date: rendu.Date,
                    mail: rendu.Email_Enseignant,
                    prof: rendu.Enseignant,
                    matiere: rendu.Matiere,
                    objet: rendu.Objet,
                    formation: rendu.Formation
                });
            });
            //TODO Gérer erreur requête
            //TODO Gérer absence jeu à cet ID
        }
    },[]);

    //TODO Renvoyer vers nouvelle page à la fin de creerJeu
    //TODO Renvoyer vers nouvelle page à la fin de modifierJeu

    const creerRendu = (event) => {
        event.preventDefault();

        //Créer jeu dans BDD avant de tenter uploads
        //Les valeurs FALSE sont des placeholders pour créer les champs "vides"
        //TODO Récupérer les valeurs des champs absents (admin)
        push(ref(database,`Rendu`), {
            Date: formulaire.date,
            Email_Enseignant: formulaire.mail,
            Enseignant: formulaire.prof,
            Matiere: formulaire.matiere,
            Objet: formulaire.objet,
            Formation: formulaire.formation
        })
        .then(() => {
            alert(`Rendu créé.`);
            navigate("/calendrier");
        });

        //TODO Gérer erreur création rendu dans BDD
        /* 
        *   Si erreur :
        *       - Arrêter création ici
        *       - Afficher message d'erreur
        */
    }

    const modifierRendu = (event) => {
        event.preventDefault();

        //Modification valeurs depuis champs texte
        update(ref(database, `Rendu/${idRendu}`), {
            Date: formulaire.date,
            Email_Enseignant: formulaire.mail,
            Enseignant: formulaire.prof,
            Matiere: formulaire.matiere,
            Objet: formulaire.objet,
            Formation: formulaire.formation
        })
        .then(() => {
            alert(`Rendu modifié.`);
            navigate("/calendrier");
        });

        //TODO Gérer erreur modification rendu dans BDD
        /* 
        *   Si erreur :
        *       - Arrêter création ici
        *       - Afficher message d'erreur
        */
    }

    return (
        <>
        <div className='form-body'>
            <h1 className='form-title'>Administration jeux</h1>
            <form onSubmit={(idRendu) ? modifierRendu : creerRendu} className='form'>
                <div className='form-line'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <div className='form-intro'>
                    <p>Vous êtes sur la page d'administration des jeux, vous pourrez modifier, ajouter ou retirer toutes informations plus tard.<br/>
                    Pour tout problème rencontré contacter </p>
                    <a href="mailto:ludhic.association@gmail.fr">ludhic.association@gmail.com</a>
                </div>
                <h2 className='form-title-h2'>Informations principales</h2>
                <div className='form-component'>
                    <label htmlFor="mdp">Rôle* : </label>
                    <select name="formation" value={formulaire.formation} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)}>
                        <option value='MAJIC_M1'>MAJIC 1ère année</option>
                        <option value='MAJIC_M2'>MAJIC 2ème année</option>
                        <option value='MAPIC_M1'>MAPIC 1ère année</option>
                        <option value='MAPIC_M2'>MAPIC 2ème année</option>
                    </select>
                </div>
                <div className='form-component'>
                    <label htmlFor="matiere">Matière* : </label>
                    <input name="matiere" type="text" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.matiere}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="objet">Objet du rendu* : </label>
                    <input name="objet" type="text" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.objet}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="prof">Enseignant* : </label>
                    <input name="prof" type="text" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.prof}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="mail">Email de l'enseignant* : </label>
                    <input name="mail" type="text" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.mail}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="date">Date de rendu* : </label>
                    <input name="date" type="date" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.date}/>
                </div>

                <p className='form-text'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Envoyer le formulaire" />
                </div>
            </form>
        </div>
        </>
    )
}

export default FormulaireRendu