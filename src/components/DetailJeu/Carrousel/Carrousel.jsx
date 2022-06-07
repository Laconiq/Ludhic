import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./carrousel.css"

class Carrousel extends React.Component {
  render(){
  return (
    <Carousel className='carrousel'
    showIndicators={false} 
    showStatus={false}
    >
        <div>
            <img src="https://image.noelshack.com/fichiers/2019/07/1/1549843154-z9z.png" alt=""/>
        </div>
        <div>
            <img src="https://via.placeholder.com/800x800" alt=""/>
        </div>
        <div>
            <img src="https://via.placeholder.com/1920x1080" alt=""/>
        </div>
    </Carousel>
  )
}
}

export default Carrousel