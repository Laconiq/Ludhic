import React from 'react';
import '../../DetailJeu/detailjeu.css';
import { getDatabase, ref, get, child } from 'firebase/database';


class Participant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            membres: []
        };
    }

    componentDidMount() {
        //TODO Récupérer ID par lien requête
        const jeuId = 1;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Jeu/${jeuId}/Membre`)).then((snapshot) => {
        if (snapshot.exists()) 
        {
            snapshot.val().forEach(element => {
                get(child(dbRef, `Compte/${element.Compte}`)).then((snapshot) => {
                    if (snapshot.exists())
                    {
                        let membre = {
                            id:element.Compte,
                            nom:snapshot.val().Nom,
                            prenom:snapshot.val().Prenom,
                            poste:element.Poste
                        };
                        this.setState(prevState => ({membres: [...prevState.membres, membre]}));
                    }
                });
            });
        }
        }).catch((error) => {
            //TODO gestion si erreur de requête
            console.error(error);
        });
    }

    render() {
        return (
            <section id='etudiant'>
            <h2>Étudiant participants au projet :</h2>
                {
                    this.state.membres.map(({id, nom, prenom, poste}) => {
                        return (
                            <article key={id}>
                                <p className='etudiant'>{prenom} {nom} : {poste}</p>
                            </article>
                        )
                    }
                    )
                }
            </section>
        )
    }
}

export default Participant