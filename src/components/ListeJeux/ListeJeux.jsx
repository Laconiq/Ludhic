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
                (snapshot) => {
                    if (snapshot.exists()) {
                        const res = snapshot.val();
                        Object.keys(res).forEach((id) => {
                            if (res[id].Visible) {
                                const anneeJeu = res[id].Annee;
                                if (!anneeJeu) return false;
                                if (!listeJeux[anneeJeu]) listeJeux[anneeJeu] = new Array();
                                listeJeux[anneeJeu].push({
                                    id: id,
                                    titre: res[id].Titre,
                                    logo: res[id].Logo,
                                    description: res[id].Description_Courte,
                                    lien: "/jeux/" + id
                                });
                            }
                        });
                        setListeJeux({ ...listeJeux });
                    }
                    else {
                        console.log("Aucun jeu trouvé dans la base de données");
                        const year = new Date().getFullYear();
                        listeJeux[year] = new Array();
                        listeJeux[year].push({ id: "void", titre: "Aucun jeu ?", logo: "https://via.placeholder.com/500?text=Aucun+Jeu", description: "Félicitation ! Nous n'avons trouvé aucun jeu ! C'est probablement pas normal ...", lien: "/" });
                        setListeJeux({ ...listeJeux });
                    }
                },
                (error) => {
                    alert("Erreur de connexion à la base de données. Veuillez réessayer ultérieurement.");
                    setListeJeux({ ...[{ id: "void", titre: "Aucun jeu ?", logo: "https://via.placeholder.com/500?text=Aucun+Jeu", description: "Félicitation ! Nous n'avons trouvé aucun jeu ! C'est probablement pas normal ...", lien: "/" }] });
                }
            );
    }, []);

    return (
        <div className='game-container'>
            {
                //Boucler sur chaque année, de la plus récente à la plus ancienne
                Object.keys(listeJeux).reverse().map((annee) => {
                    return (
                        <div key={annee}>
                            <div id={annee}>
                                <h2>{annee}</h2>
                            </div>
                            <div className='game-per-year-container'>
                                {
                                    //Boucler sur les jeux de cette année
                                    listeJeux[annee].map((jeu) => {
                                        return (
                                            <article className='game-item' key={jeu.id}>
                                                <a href={jeu.lien}>
                                                    <div className='game-image-container'>
                                                        <img src={jeu.logo} alt={jeu.titre} className='game-image' />
                                                        <h3 className='game-title'>{jeu.titre}</h3> 
                                                    </div>
                                                    <div className='game-info'>
                                                        <p className='game-info-title'>{jeu.titre}</p>
                                                        <small className='game-desc'>{jeu.description}</small>
                                                    </div>
                                                </a>
                                            </article>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListeJeux