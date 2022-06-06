import React from 'react'
import '../../DetailJeu/detailjeu.css'
import '../../../json/detail-jeu.json'

const data = [
    {
        id: 1,
        prenom: 'Bastien',
        nom: 'Okonski',
        role: 'Level Designer'
    },

    {
        id: 2,
        prenom: 'Arnaud',
        nom: 'Lysensoone-Bijou',
        role: 'Narrative Designer'
    },

    {
        id: 3,
        prenom: 'Brice',
        nom: 'Graulier',
        role: 'Développeur'
    },
]

class Getinfo extends React.Component {
    render(){
    return (
        <script>
           var requestURL = '../../../json/detail-jeu.json'
        </script>
    )
}
}

class Participant extends React.Component {
    render (){
    return (
        <section id='etudiant'>
        <h2>Étudiant participants au projet :</h2>
            {
                data.map(({id, prenom, nom, role}) => {
                    return (
                        <article key={id}>
                            <p className='etudiant'>{prenom} {nom} : {role}</p>
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