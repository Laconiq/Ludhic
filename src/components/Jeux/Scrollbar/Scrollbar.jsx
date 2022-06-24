import React from 'react'
import './scrollbar.css'

//Composant représentant la liste de liens vers les années dans la page listant les jeux
function Scrollbar(props) {
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