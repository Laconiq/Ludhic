import React from 'react'
import '../formulaire.css'
import { getDatabase, ref, push } from "firebase/database";
import { useState } from 'react';

//Composant représentant le formulaire de gestion d'un jeu (création, modification, suppression)
function FormulaireInscription() {
    const [formulaire, setFormulaire] = useState({
        mail: "",
        formation: "MAJIC_M1",
        mdp: "",
        nom: "",
        prenom: ""
    });

    //Fonctions de gestion des données du formulaire
    const modificationFormulaire = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        formulaire[name] = value;
        setFormulaire({...formulaire});
        console.log(formulaire);
    }

    //TODO Renvoyer vers nouvelle page à la fin de creerDemande

    const creerDemande = (event) => {
        event.preventDefault();

        const refDb = ref(getDatabase(), `Compte_En_Attente`);

        push(refDb, {
            Email: formulaire.mail,
            Formation: formulaire.formation,
            Mot_De_Passe: formulaire.mdp,
            Nom: formulaire.nom,
            prenom: formulaire.prenom
        });

        //TODO Gérer erreur demande dans BDD
        /* 
        *   Si erreur :
        *       - Arrêter création ici
        *       - Afficher message d'erreur
        */

        alert(`Demande d'inscription envoyée.`);
    }

    return (
        <>
            <h1 className='form-titre'>Demande d'inscription</h1>
            <form onSubmit={creerDemande} className='form'>
                <div className='form-ligne'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <div className='form-intro'>
                    <p>
                        Les inscriptions au site internet de l'association Ludhic sont validées par les administrateurs. 
                        Si vous rencontrez un problème ou souhaitez poser une question :
                    </p>
                    <a href="mailto:ludhic.association@gmail.fr">ludhic.association@gmail.com</a>
                </div>
                <h2 className='form-titre-h2'>Informations principales</h2>
                <div className='form-component'>
                    <label htmlFor="nom">Nom(s)* :</label>
                    <p className='form-texte'>Cette information peut être affichée sur les pages suivantes : Jeu, Annuaire</p>
                    <input name="nom" type="text" maxLength={128} required='required' onChange={modificationFormulaire} value={formulaire.nom}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="prenom">Prénom(s)* : </label>
                    <p className='form-texte'>Cette information peut être affichée sur les pages suivantes : Jeu, Annuaire</p>
                    <input name="prenom" type="text" maxLength={128} required='required' onChange={modificationFormulaire} value={formulaire.prenom}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="mail">Email* : </label>
                    <input name="mail" type="email" required='required' onChange={modificationFormulaire} value={formulaire.mail}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="mdp">Mot de passe* : </label>
                    <p className='form-texte'>Cette information peut être affichée sur les pages suivantes : Jeu, Annuaire</p>
                    <input name="mdp" type="password" maxLength={128} required='required' onChange={modificationFormulaire} value={formulaire.mdp}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="mdp">Rôle* : </label>
                    <select name="formation" value={formulaire.formation} onChange={modificationFormulaire}>
                        <option value='MAJIC_M1'>MAJIC 1ère année</option>
                        <option value='MAJIC_M2'>MAJIC 2ème année</option>
                        <option value='MAPIC_M1'>MAPIC 1ère année</option>
                        <option value='MAPIC_M2'>MAPIC 2ème année</option>
                        <option value='MAJIC_ANCIEN'>Ancien MAJIC</option>
                        <option value='MAPIC_ANCIEN'>Ancien MAPIC</option>
                        <option value='PROF'>Enseignant ? Vraiment ?</option>
                    </select>
                </div>

                <p className='form-texte'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Envoyer le formulaire" />
                </div>
            </form>
        </>
    )
}

export default FormulaireInscription