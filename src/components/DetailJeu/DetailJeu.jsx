import React, { useState, useEffect } from 'react'
import './detailjeu.css'
import Participant from './Participant/Participant'
import Carrousel from './Carrousel/Carrousel'
import { getDatabase, ref, get, child } from 'firebase/database';
import { useParams } from 'react-router-dom';

function Detail_jeu() {
  const [jeu, setJeu] = useState(new Object);
  const idJeu = useParams()["id"];

  //Equivalant onMount, récupère toutes les données du jeu dans la BDD
  useEffect(()=>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu/${idJeu}`)).then((snapshot) => {
    if (snapshot.exists())
    {
        setJeu(snapshot.val());
    }
    //TODO Gestion si aucun jeu avec cet ID
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
              {/* Participant récupère array d'objets avec ID du membre et son poste */}
              <Participant membres={jeu.Membre}/>
            </div>
            {/* TODO Ne pas afficher bouton si champs vides */}
            <div className='bouton'>
              <a href={jeu.Lien_Bouton} target="_blank">{jeu.Texte_Bouton}</a>
            </div>
          </div>
        </div>       
        <div className='detailjeu_image_container'>
          {/* Carrousel récupère un array avec les URL des images */}
          <Carrousel carrousel={jeu.Carrousel}/>
        </div>
      </div>
        <div className='detailjeu_video_container'>
            {/*ATTENTION pour le lien d'une video "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            il faut récupérer uniquement ce qui est après le "?v=" donc "dQw4w9WgXcQ" qu'il faut coller après "https://www.youtube.com/embed/"*/}
            <iframe className='detailjeu_video' width="60%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
        </div>
    </body>
    </>
  )
}

export default Detail_jeu