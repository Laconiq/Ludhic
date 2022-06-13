import React, { useState, useEffect } from 'react'
import './jeux.css'
import { getDatabase, ref, get, child } from 'firebase/database';
import CarteJeu from './carteJeu';

function Jeux() {
  const [listeJeux, setListeJeux] = useState(new Object());

  //équivalant ComponentDidMountain (c'est pas lisible c'est la faute à Bastien)
  useEffect(()=>{
    //TODO Récupérer ID par lien requête
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Annee`)).then((snapshot) => {
      if (snapshot.exists())
      {
        setListeJeux(snapshot.val());
      }
    }).catch((error) => {
        //TODO gestion si erreur de requête
        console.error(error);
    });
  },[]);

  return (
    <div className='jeux-container'>
      {
        Object.keys(listeJeux).reverse().map((annee) => {
          return (
            <div key={annee}>
              <h2>{annee}</h2>
              <CarteJeu jeux={listeJeux[annee]}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default Jeux