import React, { useState, useEffect } from 'react'
import './detailjeu.css'
import Participant from './Participant/Participant'
import Carrousel from './Carrousel/Carrousel'
import { getDatabase, ref, get, child } from 'firebase/database';
import { useParams } from 'react-router-dom';

//Composant représentant la page avec les informations d'un seul jeu
function Detail_jeu() {
  const [jeu, setJeu] = useState(new Object);
  const idJeu = useParams()["id"];

  //Au chargement du composant, récupérer les informations du jeu grâce l'ID en URL dans la base de données
  useEffect(()=>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu/${idJeu}`)).then((snapshot) => {
      if (snapshot.exists())
      {
        let jeu = snapshot.val();

        //Récupérer ID vidéo depuis URL youtube
        //Code volé ici : https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = jeu.Lien_Video.match(regExp);
        let idYtb = (match&&match[7].length==11)? "https://www.youtube.com/embed/" + match[7] : false;

        setJeu({
          titre: jeu.Titre,
          desc: jeu.Description,
          txt_btn: jeu.Texte_Bouton,
          lien_btn: jeu.Lien_Bouton,
          video: idYtb,
          membres: jeu.Membre,
          carrousel: jeu.Carrousel
        });
      }
      //TODO Gestion si aucun jeu avec cet ID
    }).catch((error) => {
        //TODO gestion si erreur de requête
        console.error(error);
    });
  },[]);

  //Composants à montrer selon une condition
  const RenderBouton = (props) => {
    if(props.lien && props.txt)
    {
      return (
        <div className='bouton'>
          <a href={props.lien} target="_blank">{props.txt}</a>
        </div>
      )
    }
  }

  const RenderVideo = (props) => {
    if(props.video)
    {
      return (
        <div className='detailjeu_video_container'>
            {/*ATTENTION pour le lien d'une video "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            il faut récupérer uniquement ce qui est après le "?v=" donc "dQw4w9WgXcQ" qu'il faut coller après "https://www.youtube.com/embed/"*/}
            <iframe className='detailjeu_video' width="60%" height="100%" src={props.video}></iframe>
        </div>
      )
    }
  }

  return (
    <>
    <body>
      <div className='detailjeu_container'>
        <div className='text_container'>
          <div className='text'>
            <h1>{jeu.titre}</h1>
            <p>{jeu.desc}</p>
            <div className='participant_container'>
              {/* Participant récupère array d'objets avec ID du membre et son poste */}
              <Participant membres={jeu.membres}/>
            </div>
            <RenderBouton lien={jeu.lien_btn} txt={jeu.txt_btn} />
          </div>
        </div>       
        <div className='detailjeu_image_container'>
          {/* Carrousel récupère un array avec les URL des images */}
          <Carrousel carrousel={jeu.carrousel}/>
        </div>
      </div>
        <RenderVideo video={jeu.video}/>
    </body>
    </>
  )
}

export default Detail_jeu