import React from 'react'
import './scrollbar.css'

function Scrollbar() {
  //TODO Récupérer années depuis Jeux.jsx parce que là c'est dégueulasse
  return (
    <>
    <div className='scrollbar-container'>
        <a href="#2022">2022</a>
        <div className='scrollbar-ligne'></div>
        <a href="#2021">2021</a>
    </div>
    </>
  )
}

export default Scrollbar