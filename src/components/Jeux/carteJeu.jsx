import './jeux.css'
import { getDatabase, ref, get, child, set } from 'firebase/database';
import React, { useState, useEffect } from 'react'

function CarteJeu(props) {
    const [jeu, setJeu] = useState(new Object());

    //Equivalant didMount
    //Récupère ID du jeu depuis props.jeu, récupère infos dans BDD et verse dans state
    useEffect(()=>{
        const idJeu = props.jeu;

        const dbRef = ref(getDatabase());
        get(child(dbRef, `Jeu/${idJeu}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            let jeuTemp = snapshot.val();
            setJeu({
                id: idJeu,
                titre: jeuTemp.Titre,
                logo: jeuTemp.Logo,
                description: jeuTemp.Description_Courte,
                lien: "/jeux/" + idJeu
            });
        }
        else
        {
            //TODO Gestion si aucun jeu avec cet ID
            console.log("No game with id:", idJeu);
        }
        }).catch((error) => {
            //TODO gestion si erreur de requête
            console.error(error);
        });
    },[]);


    return (
        <article key={jeu.id}>
            <div className='jeux-item'>
                <div>
                    <a href={jeu.lien}>
                    <img src={jeu.logo} alt={jeu.titre} className='jeux-image'/>
                    </a>
                </div>
                <div className='jeux-text'>
                    <a href={jeu.lien}>
                        <h3 className='jeux-titre'>{jeu.titre}</h3>
                    </a>
                    <small className='jeux-description'>{jeu.description}</small>
                </div>
            </div>
            <div className='jeux-ligne'></div>
        </article>
    )
}

export default CarteJeu