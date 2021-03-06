import React from 'react'
import { getDatabase, ref, push, set } from "firebase/database";
import { useState } from 'react';
import { modificationFormulaire } from '../../helpers/fonctionsFormulaires';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../Administration/formulaire.css'
import { useNavigate } from 'react-router-dom';

//Composant représentant le formulaire de connexion d'un utilisateur
function FormulaireConnexion() {
    const navigate = useNavigate();
    const [formulaire, setFormulaire] = useState({
        mail: "",
        mdp: ""
    });

    const tenterConnexion = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(getAuth(), formulaire.mail, formulaire.mdp)
        .then(() => navigate("/"))
        .catch((error) => alert(error.message));
    }

    return (
        <>
            <h1 className='form-titre'>Connexion</h1>
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
                    <input name="img1" className='send-form' type="submit" value="Se connecter" />
                </div>
            </form>
            <div className='no-account'>
                <p>Pas encore de compte ? </p>
                <a href="/administration/inscription"> Inscris toi</a>
            </div>
        </>
    )
}

export default FormulaireConnexion