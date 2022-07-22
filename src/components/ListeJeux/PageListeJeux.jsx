import React, { useState, useEffect } from 'react'
import './jeux.css'
import { getDatabase, ref, get, child } from 'firebase/database';
import ListeJeux from './ListeJeux';
import Scrollbar from './Scrollbar/Scrollbar';
import HighlightGame from '../HightlightGame/HighlightGame';

//Composant représentant la page listant tous les jeux de la formation
function PageListeJeux() {
  const [listeJeux, setListeJeux] = useState(new Object());

  /* 
  * Lister les jeux selon les années :
  *   Récupérer tous les jeux
  *   Pour chaque jeu :
  *     Si le jeu est visible :
  *       Récupérer l'année du jeu
  *       Si le jeu n'as pas d'année (damage control) :
  *         Passer au jeu suivant
  *       Si cette année n'est pas listée :
  *         Ajouter l'année comme clé à la liste
  *       Ajouter le jeu à la liste, à la clé correspondant à son année
  *   Stocker la liste dans le state
  */
 //TODO Ne récupérer que les Jeux dont Afficher = True
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
            jeuId: id, 
            jeu: {
              titre: res[id].Titre,
              logo: res[id].Logo,
              description: res[id].Description_Courte,
              lien: "/jeux/" + id
            }
          });
        }
      });
      setListeJeux({...listeJeux});
    });
  },[])

  return (
    <>
      <HighlightGame/>
      <ListeJeux/>
      <Scrollbar annees={Object.keys(listeJeux).reverse()} />
    </>
  )
}

export default PageListeJeux