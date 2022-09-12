import React from 'react'
import './calendrier.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';

function Calendrier(props) {
  const [compte, setCompte] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setCompte(props.utilisateur);
  },[props]);

  useEffect(() => {
    //Si non connecté, renvoie à l'accueil automatiquement
    estConnecte(compte, true, navigate);
  },[compte]);

  return (
    <>
    <h1 className='creativelab-title'>La page Calendrier est en cours de construction</h1>
    </>
  )
}

export default Calendrier