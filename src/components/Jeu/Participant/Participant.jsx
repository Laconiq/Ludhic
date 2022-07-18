import React, { useState, useEffect } from 'react';
import '../detailjeu.css';
import { getDatabase, ref, get, child } from 'firebase/database';

//Composant représentant la liste des étudiants ayant travaillé sur un jeu
function Participant(props) {
    const [membres, setMembres] = useState(new Array());

    //Quand le composant reçoit son props, récupérer les informations à afficher pour chaque étudiant
    useEffect(()=>{
        //if évite erreurs bloquant le script tant que props.membres pas disponible
        if(props.membres)
        {
            const dbRef = ref(getDatabase());
            props.membres.forEach(membre => {
                get(child(dbRef, `Compte/${membre.Compte}`)).then((snapshot) => {
                    if (snapshot.exists())
                    {
                        let res = snapshot.val();
                        membres.push({
                            id: membre.Compte,
                            nom: snapshot.val().Nom,
                            prenom: snapshot.val().Prenom,
                            poste: membre.Poste
                        });
                        setMembres([...membres]);
                    }
                    //TODO Gérer si aucun membre à cet ID
                    }).catch((error) => {
                        //TODO gestion si erreur de requête
                        console.error(error);
                    });
            });
        }
    },[props.membres]);

    return (
        <section id='etudiant'>
        <h2>Étudiants participants au projet :</h2>
            {
                membres.map(({id, nom, prenom, poste}) => {
                    return (
                        <article key={id}>
                            <p className='etudiant'>{prenom} {nom} : {poste}</p>
                        </article>
                    )
                }
                )
            }
        </section>
    )
}

export default Participant