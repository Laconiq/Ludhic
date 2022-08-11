import './jeux.css'
import React, { useState, useEffect } from 'react'
import { getDatabase, ref, get, child } from 'firebase/database';
import { list } from 'firebase/storage';

//Composant affichant les informations d'un jeu dans la page les listant
function ListeJeux(props) {
    const [listeJeux, setListeJeux] = useState(new Object());
    
    //Récupérer tous les jeux affichables et les classer par année de sortie
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
                            if(!listeJeux[anneeJeu]) listeJeux[anneeJeu] = new Array();
                            listeJeux[anneeJeu].push({
                                id: id,
                                titre: res[id].Titre,
                                logo: res[id].Logo,
                                description: res[id].Description_Courte,
                                lien: "/jeux/" + id
                            });
                        }
                    });
                    setListeJeux({...listeJeux});
                }
                else
                {
                    console.log("Aucun jeu trouvé dans la base de données");
                    const year = new Date().getFullYear();
                    listeJeux[year] = new Array();
                    listeJeux[year].push({id:"void",titre:"Aucun jeu ?",logo:"https://via.placeholder.com/500?text=Aucun+Jeu",description:"Félicitation ! Nous n'avons trouvé aucun jeu ! C'est probablement pas normal ...", lien:"/"});
                    setListeJeux({...listeJeux});
                }   
            },
            (error) =>
            {
                alert("Erreur de connexion à la base de données. Veuillez réessayer ultérieurement.");
                setListeJeux({...[{id:"void",titre:"Aucun jeu ?",logo:"https://via.placeholder.com/500?text=Aucun+Jeu",description:"Félicitation ! Nous n'avons trouvé aucun jeu ! C'est probablement pas normal ...", lien:"/"}]});
            }
        );
    },[]);

    return (
        <div className='game-container'>
            {
                //Boucler sur chaque année, de la plus récente à la plus ancienne
                Object.keys(listeJeux).reverse().map((annee) => {
                    return (
                        <div key={annee}>
                            <div className='game-year' id={annee}>
                                <h2>{annee}</h2>
                            </div>
                            {
                                //Boucler sur les jeux de cette année
                                listeJeux[annee].map((jeu) => {
                                    return ( 
                                        <article key={jeu.id}>
                                            <div className='game-item'>
                                                <div>
                                                    <a href={jeu.lien}>
                                                    <img src={jeu.logo} alt={jeu.titre} className='game-image'/>
                                                    </a>
                                                </div>
                                                <div className='game-text'>
                                                    <a href={jeu.lien}>
                                                        <h3 className='game-title'>{jeu.titre}</h3>
                                                    </a>
                                                    <small className='game-desc'>{jeu.description}</small>
                                                </div>
                                            </div>
                                            <div className='game-line'></div>
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

export default ListeJeux