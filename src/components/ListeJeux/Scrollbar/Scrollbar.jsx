import './scrollbar.css'
import React, { useState, useEffect } from 'react'
import { getDatabase, ref, get, child } from 'firebase/database';

//Composant représentant la liste de liens vers les années dans la page listant les jeux
function Scrollbar() {
  const [annees, setAnnees] = useState(new Array());

  //Récupérer uniquement les années, les stocker du plus récent au plus ancien
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu`))
    .then(
      (snapshot) => 
      {
        if(snapshot.exists())
        {
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
        }
        else
        {
          setAnnees([...[new Date().getFullYear()]]);
        }
      },
      (error) =>
      {
        console.log(error);
        setAnnees([...[new Date().getFullYear()]]);
      }
    );
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