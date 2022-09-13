import React from 'react'
import './creativelab.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';
import { getDatabase, ref, onValue, set, get, child, update} from "firebase/database";

function CreativeLab(props) {
  const [compte, setCompte] = useState(false);
  const [listeMateriel, setListe] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setCompte(props.utilisateur);
  },[props]);

  useEffect(() => {
    //Si non connecté, renvoie à l'accueil automatiquement
    if(estConnecte(compte, true, navigate))
    {
      //Créé un évènement, à chaque modification sur la liste de vote, elle est récupérée
      onValue(ref(getDatabase(), `Materiel_Creative_Lab`), (snapshot) => {
        //TODO Si liste vide
        const data = snapshot.val();
        if(data) setListe(data);
      });
    }
  },[compte]);

  const caseEmprunt = (idObjet, idCompte) => {
    if(idCompte)
    {
      if(idCompte === compte.id) return (<button type='button' onClick={() => miseAJourEmprunt(idObjet, compte.id)}>Rendre</button>)
      else
      {
        get(child(ref(getDatabase()),`Compte/${idCompte}`))
        .then(
          (snapshot) => {
            if(snapshot.exists)
            {
              return `${snapshot.val().Nom} ${snapshot.val().Prenom}`
            }
          },
          (error) => {return "Emprunteur introuvé"}
        );
      }
    } 
    else return (<button type='button' onClick={() => miseAJourEmprunt(idObjet, compte.id)}>Emprunter</button>)
  }

  const miseAJourEmprunt = (idObjet, idCompte) => {
    const nouvelEmprunteur = (listeMateriel[idObjet].Compte) ? false : idCompte;
    update(ref(getDatabase(), `Materiel_Creative_Lab/${idObjet}`),{Compte:nouvelEmprunteur})
  }

  return (
    <table style={{color: "white"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Objet</th>
          <th>Notes sur l'objet</th>
          <th>Catégorie</th>
          <th>Emprunt</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(listeMateriel).map((idObjet) => (
            <tr key={`CL-${idObjet}`}>
              <th>{idObjet}</th>
              <th>{listeMateriel[idObjet].Nom}</th>
              <th>{listeMateriel[idObjet].Note}</th>
              <th>{listeMateriel[idObjet].Categorie}</th>
              <th>{caseEmprunt(idObjet, listeMateriel[idObjet].Compte)}</th>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default CreativeLab