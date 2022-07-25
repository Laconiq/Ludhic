import './highlightgame.css'

import React from 'react'

function HighlightGame() {
  //TODO Récupérer les 4 jeux favoris de notre public adoré
  //TODO Définir ordre tri des jeux (alphabet, random...)
  /* 
  * Récupérer tous les jeux
  * Boucler sur les jeux :
  *   Si le jeu est visible :
  *     Récupérer nombre de votes (Votes.length)
  *     Stocker jeu dans objet à clé = nombre de votes
  * Récupérer 4 jeux dans liste finale :
  *   Récupérer liste jeux les + votés
  *   Si taille liste > 4
  *     Récupérer que les 4 premiers 
  *   Si taille = 4
  *     Copier liste et quitter
  *   Si taille < 4
  *     Récupérer les jeux
  *     Récupérer nombre jeux restant à récupérer
  *     Même opération sur la liste suivante
  * Stocker liste
  */
  return (
    <>
    <div className='home-background'>
        <div className='home-line'></div>
        <h2>Le jeu le plus  upvoté</h2>
        <div className='highlight-game-container'>
          <div className='highlight-game-image'>
              <img src="https://cdn.discordapp.com/attachments/932763023293177906/995358331424231424/Woa.png" alt="" />
          </div>
          <div className='highlight_game_text_content'>
              <h3 className='highlight-game-title'>Towards the Unknown</h3>
              <p className='highlight-game-text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quo doloribus, expedita veniam corporis omnis pariatur beatae dicta deserunt possimus veritatis autem corrupti aut rem officiis laborum rerum voluptatum maiores?</p>
              <div className='bouton'>
              <a href="">Tester le jeu</a>
              </div>
          </div>
        </div>
    </div>    
    </>
  )
}

export default HighlightGame