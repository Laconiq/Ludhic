import React from 'react'
import './jeux.css'

const data = [
    {
        id : 1,
        image: 'https://lanouvelle-lejeu.fr/wp-content/uploads/2022/04/pic.png',
        titre: 'La Nouvelle',
        description: 'Blablabla',
        lien:'jeux/nomdujeu',
    },

    {
        id : 2,
        image: 'https://lanouvelle-lejeu.fr/wp-content/uploads/2022/04/pic.png',
        titre: 'Zemouurigan',
        description: 'Blablabla',
        lien:'',
    },

    {
        id : 3,
        image: 'https://lanouvelle-lejeu.fr/wp-content/uploads/2022/04/pic.png',
        titre: 'Dernière Sueur',
        description: 'Blablabla',
        lien:'',
    },

    {
        id : 4,
        image: 'https://lanouvelle-lejeu.fr/wp-content/uploads/2022/04/pic.png',
        titre: "C'est far",
        description: 'Blablabla',
        lien:'',
    }
]

function Jeux() {
  return (
    <div className='jeux-container'>
        {
          data.map(({id, image, titre, description, lien}) => {
            return (
              <article key={id} className='jeux-item'>
                <div>
                  <a href={lien}>
                    <img src={image} alt={titre} className='jeux-image'/>
                  </a>
                </div>
                <div className='jeux-text'>
                    <h3 className='jeux-titre'>{titre}</h3>
                    <small className='jeux-description'>{description}</small>
                    <a href={lien} className='jeux-bouton'>Découvrir</a>
                </div>
              </article>
            )
          })
        }
    </div>
  )
}

export default Jeux