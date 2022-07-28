import './App.css';
import NavBar from './components/NavBar/NavBar';
import PageJeu from './components/Jeu/PageJeu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageAccueil from './components/Accueil/PageAccueil';
import PageListeJeux from './components/ListeJeux/PageListeJeux';
import {Routes, Route} from "react-router-dom"
import Administration from './components/Administration/Administration';
import FormulaireJeu from './components/Administration/Jeu/FormulaireJeu'
import FormulaireInscription from './components/Administration/Inscription/FormulaireInscription'
import FormulaireRendu from './components/Administration/Rendu/FormulaireRendu';
import FormulaireCreativeLab from './components/Administration/Creative_Lab/FormulaireCreativeLab';
import Calendrier from './components/Calendrier/Calendrier';
import FormulaireConnexion from './components/Connexion/FormulaireConnexion';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/jeux/:id' element={<PageJeu/>}/>
        <Route path='/' element={<PageAccueil/>}/>
        <Route path='/jeux' element={<PageListeJeux/>}/>
        <Route path='/calendrier' element={<Calendrier/>}/>
        <Route path='/login' element={<FormulaireConnexion/>}/>
        {/* CHEMINS POUR ADMINISTRATION */}
        <Route path='/administration' element={<Administration/>}/>
        <Route path='/administration/inscription' element={<FormulaireInscription/>}/>
        <Route path='/administration/jeu' element={<FormulaireJeu/>}/>
        <Route path='/administration/jeu/:id' element={<FormulaireJeu/>}/>
        <Route path='/administration/rendu' element={<FormulaireRendu/>}/>
        <Route path='/administration/rendu/:id' element={<FormulaireRendu/>}/>
        <Route path='/administration/materiel-cl' element={<FormulaireCreativeLab/>}/>
        <Route path='/administration/materiel-cl/:id' element={<FormulaireCreativeLab/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
