import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';

function CreativeLab(props) {
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
    <h1>Creative Lab</h1>
    </>
  )
}

export default CreativeLab