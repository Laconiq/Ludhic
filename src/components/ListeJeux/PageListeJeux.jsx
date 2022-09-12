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
    /*
    <div className='home-background'>
      <h2>Les jeux en avant</h2>
      <p className='highlight-game-desc'>Salut c'est la description des jeux en avant</p>
      <HighlightGame/>
    </div>
    */
    }

      <ListeJeux/>
      <Scrollbar/>
    </>
  )
}

export default PageListeJeux