import React, { useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./carrousel.css"
import { getDatabase, ref, get, child } from 'firebase/database';
import { createPortal } from 'react-dom';

//Composant représentant l'élément affichant les images du jeu
function Carrousel (props) {
  const [images, setImages] = useState(new Array());

  //Quand le composant reçoit son props, envoyer la liste des URL dans le state
  useEffect(()=>{
    if(props.carrousel)
    {
      setImages(props.carrousel);
    }
  },[props.carrousel]);

  return (
    <Carousel className='carrousel'
    showIndicators={false} 
    showStatus={false}
    >
      {
        images.map((image, id) => {
          return (
            <div key={id}>
              <img src={image}></img>
            </div>
          )
        })
      }
    </Carousel>
  )
}

export default Carrousel