import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';
import { getDatabase, ref, get, child } from 'firebase/database';
import './administration.css';

function AdministrationListeJeux(props) {
    const [compte, setCompte] = useState(false);
    const [listeJeux, setListeJeux] = useState(new Array());
    const navigate = useNavigate();

    //TODO Faire une jolie mise en page lol
    //TODO Masquer boutons à pages non-accessibles

    useEffect(() => {
        setCompte(props.utilisateur);
    },[props]);
    
    useEffect(() => {
        //Si non connecté, renvoie à l'accueil automatiquement
        if(estConnecte(compte, true, navigate))
        {
            get(child(ref(getDatabase()),`Jeu`))
            .then(
                (snapshot) => {
                    if(snapshot.exists())
                    {
                        const res = snapshot.val();
                        Object.keys(res).forEach((id) => {
                            let estModifiable = compte.admin;
                            for(let adm of res[id].Administrateur) { if(adm == compte.id) { estModifiable = true; break; } }
                            if(estModifiable)
                            {
                                listeJeux.push({
                                    id: id,
                                    titre: res[id].Titre,
                                    logo: res[id].Logo,
                                    description: res[id].Description_Courte,
                                    lien: "/administration/jeu/" + id
                                });
                            }
                        });
                        setListeJeux([...listeJeux]);
                    }
                },
                (error) => {
                    //TODO erreur récupération
                    alert(error);
                }
            );
        }
    },[compte]);

    return (
        <>
            { document.title = "Jeux modifiables - Ludhic" }
            <h1 className='form-title'>Administration</h1>
            <div className='form-line'></div>

            <a href="/administration/jeu"><button type='button'>Créer un jeu</button></a>

            <div>
                {
                    listeJeux.map((jeu) => (
                        <article key={jeu.id}>
                            <div className='game-item'>
                                <div>
                                    <a href={jeu.lien}>
                                    <img src={jeu.logo} alt={jeu.titre} className='game-image'/>
                                    </a>
                                </div>
                                <div className='game-text'>
                                    <a href={jeu.lien}>
                                        <h3 className='game-title'>{jeu.titre}</h3>
                                    </a>
                                    <small className='game-desc'>{jeu.description}</small>
                                </div>
                            </div>
                            <div className='game-line'></div>
                        </article>
                    ))
                }
            </div>

        </>
    )
}

export default AdministrationListeJeux