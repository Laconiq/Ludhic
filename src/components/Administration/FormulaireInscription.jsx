import React from 'react'
import './formulaire.css'
import { getDatabase, ref, set } from "firebase/database";
import { useState } from 'react';
import { modificationFormulaire } from '../../helpers/fonctionsFormulaires';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

//Composant représentant le formulaire de gestion d'un jeu (création, modification, suppression)
function FormulaireInscription(props) {
    const navigate = useNavigate();
    const [formulaire, setFormulaire] = useState({
        mail: "",
        formation: "MAJIC",
        niveau: "1",
        mdp: "",
        nom: "",
        prenom: ""
    });

    //TODO Améliorer messages d'erreur, notament à création dans Auth

    /*
    *   La création de compte se fait en 2 parties :
    *       - Créer le compte dans Firebase Auth (mail, mot de passe)
    *       - Créer le compte dans Realtime Database (nom, prenom, formation, niveau, administrateur)
    *   Une parte des informations est stockée dans la base de données parce qu'elles ne peuvent pas être ajoutés directement dans Auth.
    *   L'utilisateur est connecté automatiquement à la création du compte.
    */
    const creerDemande = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(getAuth(), formulaire.mail, formulaire.mdp)
        .then(
            (newUser) => 
            {
                set(ref(getDatabase(), `Compte/${newUser.user.uid}`), {
                    Nom: formulaire.nom,
                    Prenom: formulaire.prenom,
                    Formation: formulaire.formation,
                    Niveau: formulaire.niveau,
                    Admin: false
                })
                .then(
                    () => 
                    {
                        alert(`Inscription complète. Vous êtes bien connecté. Bienvenue ${formulaire.prenom}.`);
                        navigate("/");
                    },
                    () =>
                    {
                        alert('Un problème est survenu lors de l\'enregistrement de certaines données dans la base de données. Le nécessaire du compte a été créé (pair mail/mot de passe), mais n\'est pas utilisable. Veuillez contacter un administrateur du site.');
                    }
                );
            }
        )
        .catch((error) => {
            let msg;
            switch(error.code)
            {
                case "auth/invalid-email":
                    msg = "Cet email n'est pas valide.";
                    break;
                case "auth/invalid-recipient-email":
                    msg = "Cet email n'est pas valide.";
                    break;
                case "auth/email-already-in-use":
                    msg = "Ce mail est déjà lié à un compte.";
                    break;
                case "auth/wrong-password":
                    msg = "Le mot de passe n'est pas valide.";
                    break;
                case "auth/internal-error":
                    msg = "Erreur interne au système de connexion.";
                    break;
                default:
                    msg = "Une erreur inconnue est survenue.";
                    break;
            }
            alert(msg);
        });
    }

    return (
        <>
        { document.title = "Inscription - Ludhic" }
        <div className='form-body'>
            <h1 className='form-title'>Demande d'inscription</h1>
            <form onSubmit={creerDemande} className='form'>
                <div className='form-line'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <div className='form-intro'>
                    <p>Les inscriptions au site internet de l'association Ludhic sont validées par les administrateurs.<br/> 
                    Si vous rencontrez un problème ou souhaitez poser une question : </p>
                    <a href="mailto:ludhic.association@gmail.fr">ludhic.association@gmail.com</a>
                </div>
                <h2 className='form-title-h2'>Informations principales</h2>
                
                <div className='form-component'>
                    <label htmlFor="nom">Nom(s)* :</label>
                    <input name="nom" type="text" maxLength={128} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.nom}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="prenom">Prénom(s)* : </label>
                    <input name="prenom" type="text" maxLength={128} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.prenom}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="mail">Email* : </label>
                    <input name="mail" type="email" required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.mail}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="mdp">Mot de passe* : </label>
                    <input name="mdp" type="password" minLength={6} maxLength={128} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.mdp}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="formation">Rôle* : </label>
                    <select name="formation" value={formulaire.formation} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)}>
                        <option value='MAJIC'>MAJIC</option>
                        <option value='MAPIC'>MAPIC</option>
                        <option value='AUTRE'>Autre</option>
                    </select>
                </div>
                <div className='form-component'>
                    <label htmlFor="niveau">Année* : </label>
                    <select name="niveau" value={formulaire.niveau} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)}>
                        <option value='1'>1ère année</option>
                        <option value='2'>2ème année</option>
                        <option value='ANCIEN'>Ancien</option>
                    </select>
                </div>

                <p className='form-text'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Créer son compte" />
                </div>
            </form>
        </div>
        </>
    )
}

export default FormulaireInscription