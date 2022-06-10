import React, { useState, useEffect } from 'react'
import './jeux.css'
import { getDatabase, ref, get, child } from 'firebase/database';

function Jeux() {
  const [listeJeux, setListeJeux] = useState(new Array());

  //équivalant ComponentDidMountain (c'est pas lisible c'est la faute à Bastien)
  useEffect(()=>{
    //TODO Récupérer ID par lien requête
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Annee`)).then((snapshot) => {
      if (snapshot.exists())
      {
        let annees = snapshot.val();
        //Récupérer la liste par année
        Object.keys(annees).forEach(annee => {
          //Objet qui sera utilisé dans le State
          let objectAnnee = {
            annee: annee,
            jeux: []
          };
          
          //Pour chaque liste, récupérer valeurs voulues et transférer dans jeuxParAnnée à année correspondante
          annees[annee].forEach(idJeu => {
            get(child(dbRef, `Jeu/${idJeu}`))
            .then((snapshot) => {
              if(snapshot.exists())
              {
                let jeu = snapshot.val();
                objectAnnee.jeux.push({
                  id: idJeu,
                  logo: jeu.Logo,
                  titre: jeu.Titre,
                  description: jeu.Description_Courte,
                  lien:`jeux/${idJeu}`
                });

                //TODO Rajouter cette merde dans State... franchement je sais pas
                //setListeJeux([...listeJeux, objectAnnee]);
                listeJeux.push(objectAnnee);
                setListeJeux([...listeJeux]);
              }
            })
            .catch((error) => {
              //TODO gestion si erreur de requête
              console.error(error);
            });
          });
        });
      }
    }).catch((error) => {
        //TODO gestion si erreur de requête
        console.error(error);
    });
  },[]);

  return (
    <div className='jeux-container'>
      {
        listeJeux.map(({annee, jeux}) => {
          return (
            <div key={annee}>
              <h2>{annee}</h2>
              {
                console.log(jeux)
              }
              {
                jeux.map(({id, logo, titre, description, lien}) => {
                  return (
                    <article key={id}>
                      <div className='jeux-item'>
                        <div>
                          <a href={lien}>
                            <img src={logo} alt={titre} className='jeux-image'/>
                          </a>
                        </div>
                        <div className='jeux-text'>
                            <h3 className='jeux-titre'>{titre}</h3>
                            <small className='jeux-description'>{description}</small>
                            <a href={lien} className='jeux-bouton'>Découvrir</a>
                        </div>
                      </div>
                      <div className='jeux-ligne'>
                      </div>
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

export default Jeux