import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth"

//Composant représentant la liste des étudiants ayant travaillé sur un jeu
function BoutonVote(props) {
    const [votes, setVotes] = useState(new Array());
    const [userID, setUserID] = useState(false);

    useEffect(()=>{
        //TODO Récupérer votes sur le jeu
        //Voir pour les fonctions qui gardent en temps réel l'état de la BDD

        console.log(`ID Jeu : ${props.jeu}`);

        onValue(ref(getDatabase(), `Jeu/${props.jeu}/Favoris`), (snapshot) => {
            const data = snapshot.val();
            if(data) setVotes(data);
            console.log("Votes récupérés dynamiquement :", data);
        });

        onAuthStateChanged(getAuth(), (user) => {
            if(user)
            {
                console.log(`Connecté avec l'ID ${user.uid}`);
                setUserID(user.uid);
            }
        });
    },[props.membres]);

    const miseAJourVote = (event) => {
        console.log("Votes avant modification :", votes);
        if(userID)
        {
            let nouveauxVotes = [...votes];
            if(votes.includes(userID))
            {   
                nouveauxVotes.splice(nouveauxVotes.indexOf(userID), 1);
                console.log("Nouvelle liste votes après delete : ", nouveauxVotes);
            }
            else
            {
                nouveauxVotes.push(userID);
                console.log("Nouvelle liste votes après push : ", nouveauxVotes);
            }
            set(ref(getDatabase(), `Jeu/${props.jeu}/Favoris`), nouveauxVotes);
        }
        else console.log("Erreur : pas d'ID User enregistré");
    }

    return (
        <button type='button' onClick={miseAJourVote} disabled={userID == false}>Voter</button>
    )
}

export default BoutonVote