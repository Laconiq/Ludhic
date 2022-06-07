import React from 'react';
import '../../DetailJeu/detailjeu.css';
import { getDatabase, ref, get, child } from 'firebase/database';


class Participant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            membres: [{id:0,nom:"Test",prenom:"Osterone",poste:"Rien"}]
        };
    }

    componentDidMount() {
        let listeMembres = new Array();

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
                        }
                        
                        listeMembres.push(membre);
                    }
                });
            });
            console.log(listeMembres);
            console.log(this.state.membres);
            this.setState({membres: listeMembres});
        } 
        else 
        {
            console.log("No data available");
        }
        }).catch((error) => {
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
}

export default Participant