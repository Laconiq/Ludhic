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

function App() {
  return (
    <>
      <Routes>
        <Route path='/jeux/:id' element={<><NavBar/><PageJeu/><Footer/></>}/>
        <Route path='/' element={<><NavBar/><Header/><PageAccueil/><Footer/></>}/>
        <Route path='/jeux' element={<><NavBar/><Header/><PageListeJeux/><Footer/></>}/>
        {/* CHEMINS POUR ADMINISTRATION */}
        <Route path='/administration' element={<><NavBar/><Header/><Administration/><Footer/></>}/>
        <Route path='/administration/inscription' element={<><NavBar/><Header/><FormulaireInscription/><Footer/></>}/>
        <Route path='/administration/jeu' element={<><NavBar/><Header/><FormulaireJeu/><Footer/></>}/>
        <Route path='/administration/jeu/:id' element={<><NavBar/><Header/><FormulaireJeu/><Footer/></>}/>
        <Route path='/administration/rendu' element={<><NavBar/><Header/><FormulaireRendu/><Footer/></>}/>
        <Route path='/administration/rendu/:id' element={<><NavBar/><Header/><FormulaireRendu/><Footer/></>}/>
        <Route path='/administration/materiel-cl' element={<><NavBar/><Header/><FormulaireCreativeLab/><Footer/></>}/>
        <Route path='/administration/materiel-cl/:id' element={<><NavBar/><Header/><FormulaireCreativeLab/><Footer/></>}/>
      </Routes>
    </>
  );
}

export default App;
