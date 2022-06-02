import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./carrousel.css"

function Carrousel() {
  return (
    <Carousel className='carrousel'>
        <div>
            <img src="https://image.noelshack.com/fichiers/2019/07/1/1549843154-z9z.png" alt="" className='image-slider'/>
        </div>
        <div>
            <img src="https://www.syfy.com/sites/syfy/files/styles/scale--1200/public/2021/06/shrekfest-shrek-super-slam.png" alt="" className='image-slider'/>
        </div>
        <div>
            <img src="https://wallpaper.dog/large/20429709.jpg" alt="" className='image-slider'/>
        </div>
    </Carousel>
  )
}

export default Carrousel