import React, { Component } from 'react'
import './accueil.css'

export default class Accueil extends Component {
  render() {
    return (
      <>
        <div className='accueil-bannière'>
            <img src="https://via.placeholder.com/1500x300" alt="" />
        </div>
        <div className='accueil-intro'>
          <h1 className='accueil-intro'>Ludhic</h1>
          <p className='accueil-intro'>Ludhic c'est bla bla bla bla bla</p>
        </div>
      </>
    )
  }
}