import React from 'react'
import './jeux.css'
import ListeJeux from './ListeJeux';
import Scrollbar from './Scrollbar/Scrollbar';
import HighlightGame from '../HightlightGame/HighlightGame';

//Composant représentant la page listant tous les jeux de la formation
function PageListeJeux() {
  return (
    <>
    {
      document.title = "Jeux - Ludhic"
    }
      <ListeJeux/>
    </>
  )
}

export default PageListeJeux