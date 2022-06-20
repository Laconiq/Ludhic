import React, { useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./carrousel.css"
import { getDatabase, ref, get, child } from 'firebase/database';
import { createPortal } from 'react-dom';

function Carrousel (props) {
  const [images, setImages] = useState(new Array());

  //Se met à jour quand props.carrousel est disponible
  //verse props.carrousel dans le state pour être utilisé dans Render une fois disponible
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