import './scrollbar.css'
import React, { useState, useEffect } from 'react'
import { getDatabase, ref, get, child } from 'firebase/database';

//Composant représentant la liste de liens vers les années dans la page listant les jeux
function Scrollbar() {
  const [annees, setAnnees] = useState(new Array());

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu`)).then((snapshot) => {
        const res = snapshot.val();
        Object.keys(res).forEach((id) => {
          if(res[id].Visible)
          {
              const anneeJeu = res[id].Annee;
              if(!anneeJeu) return false;
              if(!annees.includes(anneeJeu)) annees.push(anneeJeu);
          }
        });
        setAnnees([...annees.sort().reverse()]);
    });
  },[]);

  return (
    <div className='scrollbar-container'>
      {
        annees.map((annee) => {
          return (
              <span key={annee}>
                <a href={"#" + annee}>{annee}</a>
                <div className='scrollbar-ligne'></div>
              </span>
          )
        })
      }
    </div>
  )
}

export default Scrollbar