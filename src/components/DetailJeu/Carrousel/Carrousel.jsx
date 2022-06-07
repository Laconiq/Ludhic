import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./carrousel.css"
import { getDatabase, ref, get, child } from 'firebase/database';
import { createPortal } from 'react-dom';

class Carrousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    //TODO Récupérer ID par lien requête
    const jeuId = 1;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Jeu/${jeuId}/Carrousel`)).then((snapshot) => {
      if (snapshot.exists())
      {
        Object.entries(snapshot.val().images).forEach(([key, value]) => {
          let image = {
            id: key,
            image: value
          };
          this.setState(prevState => ({images: [...prevState.images, image]}));
        });
      }
    }).catch((error) => {
        //TODO gestion si erreur de requête
        console.error(error);
    });
  }

  render(){
    return (
      <Carousel className='carrousel'
      showIndicators={false} 
      showStatus={false}
      >
        {
          this.state.images.map(({id, image}) => {
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
}

export default Carrousel