import React from 'react'
import './detailjeu.css'
import Participant from './Participant/Paticipant'
import Carrousel from './Carrousel/Carrousel'

class Detail_jeu extends React.Component {
  render (){
  return (
    <>
      <div className='detailjeu_container'>
        <div className='text_container'>
          <div className='text'>
            <h1>Nom du jeu</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tristique augue sed posuere hendrerit. Donec et neque id eros efficitur sodales hendrerit porttitor lorem. Nam vulputate sapien eget ante iaculis egestas. In mauris augue, rutrum in libero eget, dignissim condimentum sapien. Sed efficitur lectus purus. Morbi efficitur faucibus sapien et eleifend. In lacinia malesuada laoreet. Etiam egestas nulla ut lorem pulvinar, quis elementum urna maximus. Etiam nunc enim, facilisis sit amet ligula eget, efficitur varius elit. Aliquam efficitur molestie augue, at viverra augue ornare non. Fusce rhoncus arcu nibh. Sed sit amet ornare metus. Mauris pretium vulputate lectus ut tincidunt. Vivamus condimentum interdum dolor quis porttitor. Praesent a sem ipsum. Sed nec metus vitae nulla blandit condimentum. Morbi nec ipsum sem. Ut rutrum varius purus id dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras tempor, justo nec pretium tincidunt, sapien lectus dignissim elit, vel laoreet nulla augue sit amet justo. Fusce blandit hendrerit porttitor. Sed nulla mi, consectetur non elit sit amet, porta venenatis quam.
            </p>
            <div className='participant_container'>
              <Participant/>
            </div>
            <div className='bouton'>
              <a href="#leliendujeu">Télécharger</a>
            </div>
          </div>
        </div>       
        <div className='detailjeu_image_container'>
          <Carrousel/>
        </div>
      </div>
    </>
  )
}
}

export default Detail_jeu