import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';
import './administration.css';

const data = [
    {
        id: 1,
        image: 'https://cdn.discordapp.com/attachments/973168025819824169/1009141920854978630/Kakemono_qui_pense.png',
        title: 'Jeux',
        subtitle: 'soustitre',
        lien: '/administration/listeJeux',
    },

    {
        id: 2,
        image: 'https://cdn.discordapp.com/attachments/973168025819824169/1009141921400225872/Monsieur_qui_pense.png',
        title: 'Rendu',
        subtitle: 'soustitre',
        lien: '/rendu',
    },

    {
        id: 3,
        image: 'https://cdn.discordapp.com/attachments/973168025819824169/1009141920502644896/Creative_lab_qui_pense.png',
        title: 'Creative Lab',
        subtitle: 'soustitre',
        lien: '/cl',
    }
]

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

            <div>
                {
                    data.map(({id, image, title, subtitle, lien}) => {
                        return (
                            <a href={lien}>
                                <article className='administration-container' key={id}>
                                    <div>
                                        <img src={image} alt={title} />
                                    </div>
                                    <div className='administration-text'>
                                        <h2>{title}</h2>
                                        <p>{subtitle}</p>
                                    </div>
                                </article>
                            </a>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Administration