import React from 'react'
import './bingodir.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';
import { getDatabase, ref, get, child, push } from 'firebase/database';
import { modificationFormulaire } from '../../helpers/fonctionsFormulaires';

function Bingodir(props) {
  const [compte, setCompte] = useState(false);
  const [listeCases, setListe] = useState(false);
  const navigate = useNavigate();
  const [formulaire, setFormulaire] = useState({
        nvCase: ""
    }); 
  
  useEffect(() => {
    setCompte(props.utilisateur);
  },[props]);

  useEffect(() => {
    //Si non connecté, renvoie à l'accueil automatiquement
    if(estConnecte(compte, true, navigate))
    {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Bingodir`))
        .then((snapshot) => 
        {
            if (snapshot.exists())
            {
                const data = snapshot.val();
                if(data && Object.keys(data).length >= 24) 
                {
                    let randomList = new Array(), keyList = Object.keys(data), i = 0, randomCase = null;
                    while(randomList.length < 24)
                    {
                        i = Math.floor(Math.random() * (Object.keys(data).length));
                        randomCase = data[keyList[i]];
                        if(randomCase.Valide && !randomList.includes(randomCase.Texte)) randomList.push(randomCase.Texte);
                    }
                    setListe(randomList);
                }
            }
        });
    }
  },[compte, navigate]);

    const envoyerCase = (event) => {
        event.preventDefault();

        push(ref(getDatabase(),`Bingodir`), {
            Texte: formulaire.nvCase,
            Valide: false
        })
        .then(() => {
            alert(`Proposition envoyée.`);
        });
    }

  return (
    <>
        <table style={{color:"white"}}>
            <tbody>
                <tr>
                    <td>{listeCases[0] || "Le"}</td>
                    <td>{listeCases[1] || "bingo"}</td>
                    <td>{listeCases[2] || "semble"}</td>
                    <td>{listeCases[3] || "être"}</td>
                    <td>{listeCases[4] || "indisponible"}</td>
                </tr>
                <tr>
                    <td>{listeCases[5] || "Toute"}</td>
                    <td>{listeCases[6] || "l'équipe"}</td>
                    <td>{listeCases[7] || "s'excuse"}</td>
                    <td>{listeCases[8] || "pour"}</td>
                    <td>{listeCases[9] || "cela"}</td>
                </tr>
                <tr>
                    <td>{listeCases[10] || "c'est"}</td>
                    <td>{listeCases[11] || "monsieur"}</td>
                    <td>BOUTET</td>
                    <td>{listeCases[12] || "le"}</td>
                    <td>{listeCases[13] || "fautif"}</td>
                </tr>
                <tr>
                    <td>{listeCases[14] || "les"}</td>
                    <td>{listeCases[15] || "devs"}</td>
                    <td>{listeCases[16] || "sont"}</td>
                    <td>{listeCases[17] || "totalement"}</td>
                    <td>{listeCases[18] || "innocents"}</td>
                </tr>
                <tr>
                    <td>{listeCases[19] || "plaignez"}</td>
                    <td>{listeCases[20] || "vous"}</td>
                    <td>{listeCases[21] || "à"}</td>
                    <td>{listeCases[22] || "Bastien"}</td>
                    <td>{listeCases[23] || "Okonski"}</td>
                </tr>
            </tbody>
        </table>

        <div className='form-body'>
            <form onSubmit={envoyerCase} className='form'>
                <div className='form-component'>
                    <label htmlFor="mail">Proposer une case (128 caractères maximum) : </label>
                    <input name="nvCase" type="text" maxLength={128} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.nvCase}/>
                </div>

                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Envoyer le formulaire" />
                </div>
            </form>
        </div>
    </>
  )
}

export default Bingodir