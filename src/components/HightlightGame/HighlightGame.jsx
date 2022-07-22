import './highlightgame.css'

import React from 'react'

function HighlightGame() {
  return (
    <>
    <div className='accueil_bg'>
        <div className='accueil_line'></div>
        <h2>Le jeu le plus  upvoté</h2>
        <div className='highlight_game_content'>
        <div className='highlight_game_image'>
            <img src="https://cdn.discordapp.com/attachments/932763023293177906/995358331424231424/Woa.png" alt="" />
        </div>
        <div className='highlight_game_text_content'>
            <h3 className='highlight_game_titre'>Towards the Unknown</h3>
            <p className='highlight_game_text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quo doloribus, expedita veniam corporis omnis pariatur beatae dicta deserunt possimus veritatis autem corrupti aut rem officiis laborum rerum voluptatum maiores?</p>
            <div className='bouton'>
            <a href="">Tester le jeu</a>
            </div>
        </div>
        </div>
    </div>    
    </>
  )
}

export default HighlightGame