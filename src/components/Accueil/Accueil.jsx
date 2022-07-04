import React, { Component } from 'react'
import './accueil.css'

export default class Accueil extends Component {
  render() {
    return (
      <>
        <div className='accueil-bannière'>
            <img src="https://via.placeholder.com/1500x400" alt="" />
        </div>
        <div className='accueil-intro'>
          <h1 className='accueil-intro-text'>Ludhic</h1>
          <p className='accueil-intro-text'>Ludhic est une association regroupant plusieurs étudiants et anciens étudiants du Master HIC (anciennement MAJE).<br/>
          Cette association a pour but de mettre de répertorier et de mettre en avant les travaux des étudiants.
          </p>
        </div>
        <a href="/administration">Administration</a>
      </>
    )
  }
}