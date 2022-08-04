import React, { useState, useEffect } from 'react'
import './detailjeu.css'
import Participant from './Participant/Participant'
import Carrousel from './Carrousel/Carrousel'
import BoutonVote from './BoutonVote/BoutonVote'
import { getDatabase, ref, get, child } from 'firebase/database';
import { useParams } from 'react-router-dom';

//Composant représentant la page avec les informations d'un seul jeu
function PageJeu() {
  const [jeu, setJeu] = useState(new Object);
  const idJeu = useParams()["id"];

  //TODO Gérer erreur aucun jeu à cet ID
  //TODO Gérer erreur récupération des données

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
    }).catch((error) => {
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
        <div className='one-game-video-container'>
            {/*ATTENTION pour le lien d'une video "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            il faut récupérer uniquement ce qui est après le "?v=" donc "dQw4w9WgXcQ" qu'il faut coller après "https://www.youtube.com/embed/"*/}
            <iframe className='one-game-video' width="60%" height="100%" src={props.video}></iframe>
        </div>
      )
    }
  }

  return (
    <>
    <body>
      <div className='one-game-container'>
        <div className='one-game-text-container'>
          <div className='one-game-text'>
            <div className='one-game-title'>
              <h1>{jeu.titre}</h1>
              {/* <BoutonVote jeu={idJeu}/> */}
            </div>
            <p>{jeu.desc}</p>
            <div className='student-container'>
              {/* Participant récupère array d'objets avec ID du membre et son poste */}
              <section id='etudiant'>
                <h2>Étudiants participants au projet :</h2>
                {
                  jeu.membres && (
                    <>
                    {
                      jeu.membres.map(membre => {
                        return (
                          <article key={`${membre.prenom}-${membre.nom}`}>
                            <p className='student'>{membre.prenom} {membre.nom} : {membre.poste}</p>
                          </article>
                        )
                      })
                    }
                    </>
                  )
                }
              </section>
            </div>
            <RenderBouton lien={jeu.lien_btn} txt={jeu.txt_btn} />
          </div>
        </div>       
        <div className='one-game-image-container'>
          {/* Carrousel récupère un array avec les URL des images */}
          <Carrousel carrousel={jeu.carrousel}/>
        </div>
      </div>
        <RenderVideo video={jeu.video}/>
    </body>
    </>
  )
}

export default PageJeu