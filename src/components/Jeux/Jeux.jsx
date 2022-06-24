import React, { useState, useEffect } from 'react'
import './jeux.css'
import { getDatabase, ref, get, child } from 'firebase/database';
import CarteJeu from './carteJeu';
import Scrollbar from './Scrollbar/Scrollbar';

//Composant représentant la page listant tous les jeux de la formation
function Jeux() {
  const [listeJeux, setListeJeux] = useState(new Object());

  /* 
  * Lister les jeux selon les années :
  *   Récupérer tous les jeux
  *   Pour chaque jeu :
  *     Récupérer l'année du jeu
  *     Si le jeu n'as pas d'année (damage control) :
  *       Passer au jeu suivant
  *     Si cette année n'est pas listée :
  *       Ajouter l'année comme clé à la liste
  *     Ajouter le jeu à la liste, à la clé correspondant à son année
  *   Stocker la liste dans le state
  */
 //TODO Ne récupérer que les Jeux dont Afficher = True
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu`)).then((snapshot) => {
      const res = snapshot.val();
      Object.keys(res).forEach((id) => {
        const anneeJeu = res[id].Annee;
        if(!anneeJeu) return false;
        if(!listeJeux[anneeJeu]) listeJeux[anneeJeu] = new Array();
        listeJeux[anneeJeu].push({
          jeuId: id, 
          jeu: {
            titre: res[id].Titre,
            logo: res[id].Logo,
            description: res[id].Description_Courte,
            lien: "/jeux/" + id
          }
        });
      });
      setListeJeux({...listeJeux});
    });
  },[])

  return (
    <>
    <div className='jeux-container'>
      {
        Object.keys(listeJeux).reverse().map((annee) => {
          return (
            <div key={annee}>
              <div className='jeux-annee' id={annee}>
                <h2 >{annee}</h2>
              </div>
              {
                listeJeux[annee].map((jeu) => {
                  return ( <CarteJeu key={jeu.jeuId} jeu={jeu.jeu} /> )
                })
              }
            </div>
          )
        })
      }
    </div>
    <Scrollbar annees={Object.keys(listeJeux).reverse()} />
    </>
  )
}

export default Jeux