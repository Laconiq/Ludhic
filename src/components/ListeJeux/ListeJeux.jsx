import './jeux.css'
import React, { useState, useEffect } from 'react'
import { getDatabase, ref, get, child } from 'firebase/database';
import { list } from 'firebase/storage';

//Composant affichant les informations d'un jeu dans la page les listant
function ListeJeux(props) {
    const [listeJeux, setListeJeux] = useState(new Object());
    
    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Jeu`)).then((snapshot) => {
            const res = snapshot.val();
            Object.keys(res).forEach((id) => {
            if(res[id].Visible)
            {
                const anneeJeu = res[id].Annee;
                if(!anneeJeu) return false;
                if(!listeJeux[anneeJeu]) listeJeux[anneeJeu] = new Array();
                listeJeux[anneeJeu].push({
                    id: id,
                    titre: res[id].Titre,
                    logo: res[id].Logo,
                    description: res[id].Description_Courte,
                    lien: "/jeux/" + id
                });
            }
            });
            setListeJeux({...listeJeux});
        });
    },[]);

    return (
        <div className='jeux-container'>
            {
                Object.keys(listeJeux).reverse().map((annee) => {
                    return (
                        <div key={annee}>
                            <div className='jeux-annee' id={annee}>
                                <h2>{annee}</h2>
                            </div>
                            {
                                listeJeux[annee].map((jeu) => {
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
                                })
                            }
                        </div>
                    )
                })
            }  
        </div>
    )
}

export default ListeJeux