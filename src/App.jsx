import './App.css';
import Nav from './components/Nav/Nav';
import DetailJeu from './components/DetailJeu/DetailJeu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Accueil from './components/Accueil/Accueil';
import Jeux from './components/Jeux/Jeux';
import {Routes, Route} from "react-router-dom"
import Administration from './components/Administration/Administration';
import AdministrationJeu from './components/Administration/Jeu/AdministrationJeu'
import FormulaireInscription from './components/Administration/Inscription/FormulaireInscription'
import FormulaireRendu from './components/Administration/Rendu/FormulaireRendu';
import FormulaireCL from './components/Administration/Creative Lab/FormulaireCL';

function App() {
  return (
    <>
      <Routes>
        <Route path='/jeux/:id' element={<><Nav/><DetailJeu/><Footer/></>}/>
        <Route path='/' element={<><Nav/><Header/><Accueil/><Footer/></>}/>
        <Route path='/jeux' element={<><Nav/><Header/><Jeux/><Footer/></>}/>
        {/* CHEMINS POUR ADMINISTRATION */}
        <Route path='/administration' element={<><Nav/><Header/><Administration/><Footer/></>}/>
        <Route path='/administration/inscription' element={<><Nav/><Header/><FormulaireInscription/><Footer/></>}/>
        <Route path='/administration/jeu' element={<><Nav/><Header/><AdministrationJeu/><Footer/></>}/>
        <Route path='/administration/jeu/:id' element={<><Nav/><Header/><AdministrationJeu/><Footer/></>}/>
        <Route path='/administration/rendu' element={<><Nav/><Header/><FormulaireRendu/><Footer/></>}/>
        <Route path='/administration/rendu/:id' element={<><Nav/><Header/><FormulaireRendu/><Footer/></>}/>
        <Route path='/administration/materiel-cl' element={<><Nav/><Header/><FormulaireCL/><Footer/></>}/>
        <Route path='/administration/materiel-cl/:id' element={<><Nav/><Header/><FormulaireCL/><Footer/></>}/>
      </Routes>
    </>
  );
}

export default App;
