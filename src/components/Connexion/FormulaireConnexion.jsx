import React from 'react'
import { getDatabase, ref, push, set } from "firebase/database";
import { useState } from 'react';
import { modificationFormulaire } from '../../helpers/fonctionsFormulaires';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import '../Administration/formulaire.css'
import { useNavigate } from 'react-router-dom';

//Composant représentant le formulaire de connexion d'un utilisateur
function FormulaireConnexion() { 
    const navigate = useNavigate();
    const [formulaire, setFormulaire] = useState({
        mail: "",
        mdp: ""
    });

    //TODO Modifier bouton "déconnexion"
    //TODO bloquer un truc si déjà connecté..?

    const tenterConnexion = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(getAuth(), formulaire.mail, formulaire.mdp)
        .then(() => navigate("/"))
        .catch((error) => {
            let msg;
            switch(error.code)
            {
                case "auth/user-not-found":
                    msg = "Aucun utilisateur ne correspond à ces informations.";
                    break;
                case "auth/too-many-requests":
                    msg = "Trop de tentatives. Veuillez réessayer ultérieurement.";
                    break;
                case "auth/wrong-password":
                    msg = "Le mot de passe est incorrect.";
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
            { document.title = "Connexion - Ludhic"}
            <h1 className='form-title'>Connexion</h1>
            <form onSubmit={tenterConnexion} className='form'>
                <div className='form-ligne'></div>

    {/* INFORMATIONS PRINCIPALES */}
                <div className='form-component'>
                    <label htmlFor="mail">Email : </label>
                    <input name="mail" type="email" required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.mail}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="mdp">Mot de passe : </label>
                    <input name="mdp" type="password" maxLength={128} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.mdp}/>
                </div>

                <div className='form-component'>
                    <input name="img1" className='button-login' type="submit" value="Se connecter" />
                </div>
            </form>
            <button className='button-logout' type='button' onClick={() => signOut(getAuth()).then(console.log("Déconnecté"))}>Se déconnecter</button>
            <div className='no-account'>
                <p>Pas encore de compte ? </p>
                <a href="/inscription"> Inscris-toi</a>
            </div>
        </>
    )
}

export default FormulaireConnexion