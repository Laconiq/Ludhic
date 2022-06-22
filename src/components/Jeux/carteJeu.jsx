import './jeux.css'

function CarteJeu(props) {
    return (
        <article>
            <div className='jeux-item'>
                <div>
                    <a href={props.jeu.lien}>
                    <img src={props.jeu.logo} alt={props.jeu.titre} className='jeux-image'/>
                    </a>
                </div>
                <div className='jeux-text'>
                    <a href={props.jeu.lien}>
                        <h3 className='jeux-titre'>{props.jeu.titre}</h3>
                    </a>
                    <small className='jeux-description'>{props.jeu.description}</small>
                </div>
            </div>
            <div className='jeux-ligne'></div>
        </article>
    )
}

export default CarteJeu