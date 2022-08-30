import React from 'react'
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

            <div>
                <input name='nom' id='nom' type="text" value={compte.nom}/>
                <br/>
                <input name='prenom' id='prenom' type="text" value={compte.prenom}/>
                <br/>
                <input name='formation' id='formation' type="text" value={compte.formation}/>
                <br/>
                <input name='niveau' id='niveau' type='text' value={compte.niveau}/>
                <br/>

                <button className='button-logout' type='button' onClick={() => signOut(getAuth()).then(() => {console.log("Déconnecté."); navigate("/");})}>Se déconnecter</button>
            </div>

        </>
    )
}