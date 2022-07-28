import React from 'react'

function Administration() {
    return (
        <>
            <ul className='admin-container'>
                <li><div className='bouton'><a href='./jeu'>Jeu</a></div></li>
                <li><div className='bouton'><a href='./rendu'>Rendu</a></div></li>
                <li><div className='bouton'><a href='./materiel-cl'>Creative Lab</a></div></li>
                <li><div className='bouton'><a href='./inscription'>Inscription</a></div></li>
            </ul>
        </>
    )
}

export default Administration