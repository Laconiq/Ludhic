import React from 'react'
import './detailjeu.css'
import Participant from './Participant/Participant'
import Carrousel from './Carrousel/Carrousel'
import { getDatabase, ref, get, child } from 'firebase/database';

class Detail_jeu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre:"Template",
      desc:"Description",
      video:"https://youtu.be/mBuHQeL-OO8",
      texte_bouton:"bouton",
      lien_bouton:"https://fr.wiktionary.org/wiki/button"
    };
  }

  componentDidMount() {
    const jeuId = 1;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu/${jeuId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const jeu = snapshot.val();
        this.setState({
          titre: jeu.Titre,
          desc: jeu.Description,
          video: jeu.Lien_Video,
          texte_bouton: jeu.Texte_Bouton,
          lien_bouton: jeu.Lien_Bouton
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  
  render() {
    return (
      <>
      <body>
        <div className='detailjeu_container'>
          <div className='text_container'>
            <div className='text'>
              <h1>{this.state.titre}</h1>
              <p>{this.state.desc}</p>
              <div className='participant_container'>
                <Participant/>
              </div>
              <div className='bouton'>
                <a href="#leliendujeu">{this.state.texte_bouton}</a>
              </div>
            </div>
          </div>       
          <div className='detailjeu_image_container'>
            <Carrousel/>
          </div>
        </div>
      </body>
      </>
    )
  }
}

export default Detail_jeu