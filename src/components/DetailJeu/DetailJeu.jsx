import React from 'react'
import './detailjeu.css'

const Detail_jeu = () => {
  return (
    <>
    <body>
      <div className='detailjeu_container'>
        <div className='text_container'>
          <div className='text'>
            <h1>Nom du jeu</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit doloribus earum neque et facilis, consectetur amet, iusto culpa qui provident eligendi at? Nemo, facilis. Veniam facere labore voluptatem quaerat harum.</p>
          </div>
        </div>       
        <div className='detailjeu_image_container'>
          <img className='detailjeu_image' src="https://browsecat.net/sites/default/files/windows-1920x1080-wallpapers-125693-656467-6080285.png" alt="image-lanouvelle" />
        </div>
      </div>
    </body>
    </>
  )
}

export default Detail_jeu