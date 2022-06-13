import React, { useState, useEffect } from 'react'
import './detailjeu.css'
import Participant from './Participant/Participant'
import Carrousel from './Carrousel/Carrousel'
import { getDatabase, ref, get, child } from 'firebase/database';
import { useParams } from 'react-router-dom';

function Detail_jeu() {
  const [jeu, setJeu] = useState(new Object);
  const idJeu = useParams()["id"];

  useEffect(()=>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu/${idJeu}`)).then((snapshot) => {
    if (snapshot.exists())
    {
        setJeu(snapshot.val());
    }
    }).catch((error) => {
        //TODO gestion si erreur de requête
        console.error(error);
    });
  },[]);

  return (
    <>
    <body>
      <div className='detailjeu_container'>
        <div className='text_container'>
          <div className='text'>
            <h1>{jeu.Titre}</h1>
            <p>{jeu.Description}</p>
            <div className='participant_container'>
              <Participant membres={jeu.Membre}/>
            </div>
            <div className='bouton'>
              <a href={jeu.Lien_Bouton} target="_blank">{jeu.Texte_Bouton}</a>
            </div>
          </div>
        </div>       
        <div className='detailjeu_image_container'>
          <Carrousel carrousel={jeu.Carrousel}/>
        </div>
      </div>
    </body>
    </>
  )
}

export default Detail_jeu