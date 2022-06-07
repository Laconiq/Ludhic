import React from 'react'
import './footer.css'

class Footer extends React.Component {
  render(){
  return (
    <>
    <div className='footer-container'>
        <div className='ligne'></div>
        <p className='footer-text'>© 2022 Ludhic. Tous droits réservés.</p>
        <a href="#donne l'argent" className='bouton-footer'>Faire un don</a>
        <div className='ligne'></div>
    </div>
    <div className='footer-bottom'>
    </div>
    </>
  )
}
}

export default Footer