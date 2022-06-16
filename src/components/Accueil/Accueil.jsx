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
          <p className='accueil-intro-text'>Ludhic c'est bla bla bla bla bla</p>
        </div>
        <a href="/admin-jeu">Administration jeu</a>
      </>
    )
  }
}