import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import './boutonvote.css'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'

//Composant représentant la liste des étudiants ayant travaillé sur un jeu
function BoutonVote(props) {
    const [votes, setVotes] = useState(new Array());
    const [userID, setUserID] = useState(false);

    useEffect(()=>{
        //Créé un évènement, à chaque modification sur la liste de vote, elle est récupérée
        onValue(ref(getDatabase(), `Jeu/${props.jeu}/Favoris`), (snapshot) => {
            //TODO Si liste vide
            const data = snapshot.val();
            if(data) setVotes(data);
        });

        //Récupérer ID utilisateur si connecté
        onAuthStateChanged(getAuth(), (user) => {
            if(user) setUserID(user.uid);
        });
    },[]);

    const miseAJourVote = (event) => {
        if(userID)
        {
            let nouveauxVotes = [...votes];
            if(votes.includes(userID)) nouveauxVotes.splice(nouveauxVotes.indexOf(userID), 1);
            else nouveauxVotes.push(userID);
            set(ref(getDatabase(), `Jeu/${props.jeu}/Favoris`), nouveauxVotes);
        }
    }

    return (
        <button type='button' className='button-like' onClick={miseAJourVote} disabled={userID == false}><AiOutlineHeart/></button>
    )
}

export default BoutonVote