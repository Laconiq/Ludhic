import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';

function Administration(props) {
    const [compte, setCompte] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setCompte(props.utilisateur);
      },[props]);
    
      useEffect(() => {
        //Si non connecté, renvoie à l'accueil automatiquement
        estConnecte(compte, true, navigate);
      },[compte]);

    return (
        <>
            <ul className='admin-container'>
                <li><div className='bouton'><a href='./jeu'>Jeu</a></div></li>
                <li><div className='bouton'><a href='./rendu'>Rendu</a></div></li>
                <li><div className='bouton'><a href='./materiel-cl'>Creative Lab</a></div></li>
                <li><div className='bouton'><a href='./inscription'>Inscription</a></div></li>
            </ul>
        </>
    )
}

export default Administration