import React, { Component } from 'react'
import './accueil.css'
import HighlightGame from '../HightlightGame/HighlightGame'
import FormulaireConnexion from '../Connexion/FormulaireConnexion'

export default class PageAccueil extends Component {
  render() {
    return (
      <>

    {/* INTRO */}

        <div className='home-intro-container'>
          <h1 className='home-intro-title'>LUDHIC</h1>
          <h2 className='home-intro-subtitle'>Qu'est-ce que Ludhic ?</h2>
          <p className='home-intro-text'>Ludhic est une association regroupant plusieurs étudiants et anciens étudiants du Master HIC (anciennement MAJE).<br/>
          Cette association a pour but de mettre de répertorier et de mettre en avant les travaux des étudiants.
          </p>
        </div>
        <div className='home-banner'>
            <img src="https://cdn.discordapp.com/attachments/973168025819824169/990916404486234132/Possible.png" alt="" />
        </div>

    {/* HIGHLIGHT GAME */}
    <div className='home-background'>
      <div className='home-line'></div>
      <h2>Les jeux les plus populaires</h2>
      <p className='highlight-game-desc'>Ceci est une selection des 4 jeux les plus populaires parmis les étudiants du Master.</p>
      <HighlightGame/>
    </div>

    {/* QUOI DE NEUF */}     

      <div className='home-background'>
        <div className='home-line'></div>
        <h2>Quoi de neuf</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quo doloribus, expedita veniam corporis omnis pariatur beatae dicta deserunt possimus veritatis autem corrupti aut rem officiis laborum rerum voluptatum maiores?</p>
      </div>

    {/* BOUTON ADMIN */}
        
        <div className='bouton'>
          <a href="/administration/">Administration</a>
        </div>
        
      </>
    )
  }
}