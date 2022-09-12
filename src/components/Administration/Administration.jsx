import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';
import './administration.css';
import IMG1 from '../../assets/administration_jeux.jpg';
import IMG2 from '../../assets/administration_rendu.jpg';
import IMG3 from '../../assets/administration_creativelab.jpg';

const data = [
    {
        id: 1,
        image: IMG1,
        title: 'Jeux',
        subtitle: 'Liste des jeux que vous pouvez modifier',
        lien: '/administration/listeJeux',
    },

    {
        id: 2,
        image: IMG2,
        title: 'Rendu',
        subtitle: 'Bientôt disponnible...',
        lien: '',
    },

    {
        id: 3,
        image: IMG3,
        title: 'Creative Lab',
        subtitle: 'Bientôt disponnible...',
        lien: '',
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