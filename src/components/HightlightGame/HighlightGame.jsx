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

  const data = [
    {
      id: 1,
      image: "https://cdn.discordapp.com/attachments/932763023293177906/995358331424231424/Woa.png",
      title: 'TTU',
      subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quo doloribus, expedita veniam corporis omnis pariatur beatae dicta deserunt possimus veritatis autem corrupti aut rem officiis laborum rerum voluptatum maiores?',
    },

    {
      id: 2,
      image: "https://cdn.discordapp.com/attachments/932763023293177906/995358331424231424/Woa.png",
      title: 'TTU',
      subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quo doloribus, expedita veniam corporis omnis pariatur beatae dicta deserunt possimus veritatis autem corrupti aut rem officiis laborum rerum voluptatum maiores?',
    },

    {
      id: 3,
      image: "https://cdn.discordapp.com/attachments/932763023293177906/995358331424231424/Woa.png",
      title: 'TTU',
      subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quo doloribus, expedita veniam corporis omnis pariatur beatae dicta deserunt possimus veritatis autem corrupti aut rem officiis laborum rerum voluptatum maiores?',
    },

    {
      id: 4,
      image: "https://cdn.discordapp.com/attachments/932763023293177906/995358331424231424/Woa.png",
      title: 'TTU',
      subtitle: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quo doloribus, expedita veniam corporis omnis pariatur beatae dicta deserunt possimus veritatis autem corrupti aut rem officiis laborum rerum voluptatum maiores?',
    },
  ]

  return (
    <>
    <div className='highlight-game-container'>
        {
          data.map(({id, image, title, subtitle, lien}) => {
            return (
              <article key={id} className='highlight-game-one'>
                <h1 className='highlight-game-title'>Nom du jeu</h1>
                <div className='highlight-game-image'>
                  <img src={image} alt={title} />
                </div>
                <p className='highlight-game-text'>{subtitle}</p>
                <a className='see-more' href={lien}>En savoir plus</a>
              </article>
            )
          })
        }
    </div>

    </>
  )
}

export default HighlightGame