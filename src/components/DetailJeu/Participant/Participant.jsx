import React, { useState, useEffect } from 'react';
import '../../DetailJeu/detailjeu.css';
import { getDatabase, ref, get, child } from 'firebase/database';

function Participant(props) {
    const [membres, setMembres] = useState(new Array());

    //Se met à jours quand peut utiliser props.membre
    //Récupère les info à afficher pour chaque membre (nom, prénom, ID, poste) et ajoute objet à state
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