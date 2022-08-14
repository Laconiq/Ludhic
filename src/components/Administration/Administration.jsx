import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';

function Administration(props) {
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
            { document.title = "Administration - Ludhic" }
            <h1 className='form-title'>Administration</h1>
            <div className='form-line'></div>
            <ul className='admin-container'>
                <li><a href='./jeu'>Jeu</a></li>
                <li><a href='./rendu'>Rendu</a></li>
                <li><a href='./materiel-cl'>Creative Lab</a></li>
                <li><a href='../inscription'>Inscription</a></li>
            </ul>
        </>
    )
}

export default Administration