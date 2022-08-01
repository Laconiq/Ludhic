import './App.css';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { child, get, getDatabase, ref, push, update } from "firebase/database";
import NavBar from './components/NavBar/NavBar';
import PageJeu from './components/Jeu/PageJeu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageAccueil from './components/Accueil/PageAccueil';
import PageListeJeux from './components/ListeJeux/PageListeJeux';
import {Routes, Route} from "react-router-dom"
import Administration from './components/Administration/Administration';
import FormulaireJeu from './components/Administration/FormulaireJeu'
import FormulaireInscription from './components/Administration/FormulaireInscription'
import FormulaireRendu from './components/Administration/FormulaireRendu';
import FormulaireCreativeLab from './components/Administration/FormulaireCreativeLab';
import Calendrier from './components/Calendrier/Calendrier';
import FormulaireConnexion from './components/Connexion/FormulaireConnexion';
import CreativeLab from './components/CreativeLab/CreativeLab';

function App() {
  const [compte, setCompte] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if(user)
      {
        get(child(ref(getDatabase()),`Compte/${user.uid}`))
        .then((snapshot) => {
          const tmp = snapshot.val();
          setCompte({
            id: user.uid,
            admin: tmp.Admin,
            nom: tmp.Nom,
            prenom: tmp.Prenom,
            formation: tmp.Formation,
            niveau: tmp.Niveau
          });
        })
        .catch(
          //TODO gérer si erreur de requête
        );
        //TODO gérer si aucune info dans BDD
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

  //TODO Vérification connexion de l'utilisateur
  /*
  * Utilisateur conservé dans State ici
  * Passe l'utilisateur en props dans les components qui en auraient besoin
  * (exemple : Navbar, pages qui ont besoin d'être connecté, pages réservées aux admins...)
  */

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/jeux/:id' element={<PageJeu/>}/>
        <Route path='/' element={<PageAccueil/>}/>
        <Route path='/jeux' element={<PageListeJeux/>}/>
        <Route path='/calendrier' element={<Calendrier utilisateur={compte}/>}/>
        <Route path='/inscription' element={<FormulaireInscription/>}/>
        <Route path='/connexion' element={<FormulaireConnexion/>}/>
        <Route path='/creative-lab' element={<CreativeLab utilisateur={compte}/>}/>
        {/* CHEMINS POUR ADMINISTRATION */}
        <Route path='/administration' element={<Administration utilisateur={compte}/>}/>
        <Route path='/administration/jeu' element={<FormulaireJeu utilisateur={compte}/>}/>
        <Route path='/administration/jeu/:id' element={<FormulaireJeu utilisateur={compte}/>}/>
        <Route path='/administration/rendu' element={<FormulaireRendu utilisateur={compte}/>}/>
        <Route path='/administration/rendu/:id' element={<FormulaireRendu utilisateur={compte}/>}/>
        <Route path='/administration/materiel-cl' element={<FormulaireCreativeLab utilisateur={compte}/>}/>
        <Route path='/administration/materiel-cl/:id' element={<FormulaireCreativeLab utilisateur={compte}/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
