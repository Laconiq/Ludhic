import React from 'react'
import './scrollbar.css'

function Scrollbar(props) {
  //TODO Récupérer années depuis Jeux.jsx parce que là c'est dégueulasse
  return (
    <div className='scrollbar-container'>
      {
        props.annees.map((annee) => {
          return (
              <span key={annee}>
                <a href={"#" + annee}>{annee}</a>
                <div className='scrollbar-ligne'></div>
              </span>
          )
        })
      }
    </div>
  )
}

export default Scrollbar