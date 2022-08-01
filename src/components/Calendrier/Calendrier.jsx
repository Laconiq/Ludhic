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
    <div className='calendar-majic'>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=UTC&src=bXRwcmhsYzg0MGFoZTYwZXFwbG5vYjQ1dThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237CB342" border="solid 1px #777" frameborder="0" scrolling="no"></iframe>
    </div>
    </>
  )
}

export default Calendrier