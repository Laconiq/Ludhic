import './jeux.css'
import { getDatabase, ref, get, child, set } from 'firebase/database';
import React, { useState, useEffect } from 'react'

function CarteJeu(props) {
    const [jeux, setJeux] = useState(new Array());

    useEffect(()=>{
        props.jeux.forEach(idJeu => {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `Jeu/${idJeu}`)).then((snapshot) => {
            if (snapshot.exists())
            {
                let jeu = snapshot.val();
                jeux.push({
                    id: idJeu,
                    titre: jeu.Titre,
                    logo: jeu.Logo,
                    description: jeu.Description_Courte
                });
                setJeux([...jeux]);
            }
            }).catch((error) => {
                //TODO gestion si erreur de requête
                console.error(error);
            });
        });
    },[]);

    return jeux.map((jeu) => {
        return (
            <article key={jeu.id} className='jeux-item'>
                <div>
                    <a href={jeu.id}>
                    <img src={jeu.logo} alt={jeu.titre} className='jeux-image'/>
                    </a>
                </div>
                <div className='jeux-text'>
                    <h3 className='jeux-titre'>{jeu.titre}</h3>
                    <small className='jeux-description'>{jeu.description}</small>
                    <a href={jeu.id} className='jeux-bouton'>Découvrir</a>
                </div>
            </article>
        )
    })
}

export default CarteJeu