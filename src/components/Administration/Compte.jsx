import React from 'react'
import './compte.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';
import { getAuth, signOut } from "firebase/auth";
import './administration.css';

export default function Compte(props) {
    const [compte, setCompte] = useState(false);
    const navigate = useNavigate();

    //TODO Faire une jolie mise en page lol
    //TODO Masquer boutons à pages non-accessibles

    useEffect(() => {
        setCompte(props.utilisateur);
    },[props]);
    
    useEffect(() => {
        //Si non connecté, renvoie à l'accueil automatiquement
        estConnecte(compte, true, navigate);
    },[compte]);

    return (
        <>
            { document.title = "Compte - Ludhic" }
            <h1 className='form-title'>Compte</h1>
            <div className='form-line'></div>

            <div className='account-container'>
                <label htmlFor="">Nom : </label>
                <input name='nom' id='nom' type="text" value={compte.nom}/>
                <br/>
                <label htmlFor="">Prénom : </label>
                <input name='prenom' id='prenom' type="text" value={compte.prenom}/>
                <br/>
                <label htmlFor="">Formation : </label>
                <input name='formation' id='formation' type="text" value={compte.formation}/>
                <br/>
                <label htmlFor="">Niveau : </label>
                <input name='niveau' id='niveau' type='text' value={compte.niveau}/>
                <br/>
            </div>
            
            <button className='button-logout' type='button' onClick={() => signOut(getAuth()).then(() => {console.log("Déconnecté."); navigate("/");})}>Se déconnecter</button>

        </>
    )
}