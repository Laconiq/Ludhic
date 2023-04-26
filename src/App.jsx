import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { child, get, getDatabase, ref } from "firebase/database";
import NavBar from './components/NavBar/NavBar';
import PageJeu from './components/Jeu/PageJeu';
//import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageAccueil from './components/Accueil/PageAccueil';
import PageListeJeux from './components/ListeJeux/PageListeJeux';
import {Routes, Route} from "react-router-dom"
import Administration from './components/Administration/Administration';
import FormulaireJeu from './components/Administration/FormulaireJeu'
import FormulaireInscription from './components/Administration/FormulaireInscription'
//import FormulaireRendu from './components/Administration/FormulaireRendu';
//import FormulaireCreativeLab from './components/Administration/FormulaireCreativeLab';
import Calendrier from './components/Calendrier/Calendrier';
import FormulaireConnexion from './components/Connexion/FormulaireConnexion';
import CreativeLab from './components/CreativeLab/CreativeLab';
import AdministrationListeJeux from './components/Administration/AdministrationListeJeux';
import Compte from './components/Administration/Compte';

function App() {
  const [compte, setCompte] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if(user)
      {
        get(child(ref(getDatabase()),`Compte/${user.uid}`))
        .then(
          (snapshot) => 
          {
            if(snapshot.exists)
            {
              const tmp = snapshot.val();
              setCompte({
                id: user.uid,
                admin: tmp.Admin,
                nom: tmp.Nom,
                prenom: tmp.Prenom,
                formation: tmp.Formation,
                niveau: tmp.Niveau
              });
            }
            else
            {
              alert(`Le compte ${user.uid} est incomplet. Aucune information dans la base de données. Vous serez déconnecté par sécurité. Veuillez contacter l'administration du site.`);
              setCompte({
                id: false,
                admin: false,
                nom: false,
                prenom: false,
                formation: false,
                niveau: false
              });
              signOut(getAuth());
            }
          },
          (error) =>
          {
            alert('Erreur lors de la récupération des données du compte.');
            setCompte({
              id: false,
              admin: false,
              nom: false,
              prenom: false,
              formation: false,
              niveau: false
            });
          }
        )
        .catch((error) => {alert(error);});
      }
      else
      {
        setCompte({
          id: false,
          admin: false,
          nom: false,
          prenom: false,
          formation: false,
          niveau: false
        });
      }
    });
  },[])

  useEffect(() => {
    if(compte) console.log("Compte :", compte);
  },[compte])

  return (
    <> 
    <div className='body-container'>
      <NavBar utilisateur={compte}/>
      <Routes>
        <Route path='/jeux/:id' element={<PageJeu/>}/>
        <Route path='/' element={<PageAccueil/>}/>
        <Route path='/jeux' element={<PageListeJeux/>}/>
        <Route path='/inscription' element={<FormulaireInscription/>}/>
        <Route path='/connexion' element={<FormulaireConnexion/>}/>
        <Route path='/creative-lab' element={<CreativeLab utilisateur={compte}/>}/>
        <Route path='/calendrier' element={<Calendrier/>}/>
        
        {/* CHEMINS POUR ADMINISTRATION */}
        <Route path='/compte' element={<Compte utilisateur={compte}/>}/>
        <Route path='/administration' element={<Administration utilisateur={compte}/>}/>
        <Route path='/administration/jeu' element={<FormulaireJeu utilisateur={compte}/>}/>
        <Route path='/administration/jeu/:id' element={<FormulaireJeu utilisateur={compte}/>}/>
        <Route path='/administration/listeJeux' element={<AdministrationListeJeux utilisateur={compte}/>}/>
        
        {
          /*
            <Route path='/calendrier' element={<Calendrier utilisateur={compte}/>}/>
            <Route path='/creative-lab' element={<CreativeLab utilisateur={compte}/>}/>
            <Route path='/administration/rendu' element={<FormulaireRendu utilisateur={compte}/>}/>
            <Route path='/administration/rendu/:id' element={<FormulaireRendu utilisateur={compte}/>}/>
            <Route path='/administration/materiel-cl' element={<FormulaireCreativeLab utilisateur={compte}/>}/>
            <Route path='/administration/materiel-cl/:id' element={<FormulaireCreativeLab utilisateur={compte}/>}/>
          */
        }
      </Routes>
      <Footer/>
      </div>
    </>
  );
}

export default App;
