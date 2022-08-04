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

    //TODO Modifier champ MDP pour permettre que 6 ou + caractères
    //TODO Modifier ou supprimer message confirmant l'inscription
    //TODO Connecter utilisateur une fois le tout créé ?
    //TODO gérer cas d'erreur à la création d'un compte
    //TODO gérer cas d'erreur à l'ajout de données dans la BDD

    const creerDemande = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(getAuth(), formulaire.mail, formulaire.mdp)
        .then((newUser) => {
            console.log(newUser.user.uid);
            set(ref(getDatabase(), `Compte/${newUser.user.uid}`), {
                Nom: formulaire.nom,
                Prenom: formulaire.prenom,
                Formation: formulaire.formation,
                Niveau: formulaire.niveau,
                Admin: false
            })
            .then(() => {
                alert(`Inscription complète.`);
                navigate("/connexion");
            });
        });
    }

    return (
        <>
        <div className='form-body'>
            <h1 className='form-title'>Demande d'inscription</h1>
            <form onSubmit={creerDemande} className='form'>
                <div className='form-ligne'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <div className='form-intro'>
                    <p>Les inscriptions au site internet de l'association Ludhic sont validées par les administrateurs.<br/> 
                    Si vous rencontrez un problème ou souhaitez poser une question : </p>
                    <a href="mailto:ludhic.association@gmail.fr">ludhic.association@gmail.com</a>
                </div>
                <h2 className='form-titre-h2'>Informations principales</h2>
                
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
                    <input name="mdp" type="password" maxLength={128} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.mdp}/>
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

                <p className='form-texte'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Créer son compte" />
                </div>
            </form>
        </div>
        </>
    )
}

export default FormulaireInscription