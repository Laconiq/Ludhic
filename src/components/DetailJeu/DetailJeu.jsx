import React, {Component} from 'react'
import './detailjeu.css'
import JeuDataService from '../../services/jeu.service'

class Detail_jeu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: "Nom du jeu",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit doloribus earum neque et facilis, consectetur amet, iusto culpa qui provident eligendi at? Nemo, facilis. Veniam facere labore voluptatem quaerat harum.",
      image: "https://via.placeholder.com/1920x1080",
    }
  }

  getJeu(id) {
    JeuDataService.getByID(id)
    .then(response => this.setState(
      {
        titre: response.data.Titre,
        description: response.data.Description
      }))
    .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getJeu(1);
  }

  render() {
    return (
      <>
      <body>
        <div className='detailjeu_container'>
          <div className='text_container'>
            <div className='text'>
              <h1>{this.state.titre}</h1>
              <p>{this.state.description}</p>
            </div>
          </div>       
          <div className='detailjeu_image_container'>
            <img className='detailjeu_image' src={this.state.image} alt="image-lanouvelle" />
          </div>
        </div>
      </body>
      </>
    )
  }
}

export default Detail_jeu