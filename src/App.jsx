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

function App() {
  return (
    <>
      <Routes>
        <Route path='/jeux/:id' element={<><NavBar/><PageJeu/><Footer/></>}/>
        <Route path='/' element={<><NavBar/><PageAccueil/><Footer/></>}/>
        <Route path='/jeux' element={<><NavBar/><PageListeJeux/><Footer/></>}/>
        <Route path='/calendrier' element={<><NavBar/><Calendrier/><Footer/></>}/>
        {/* CHEMINS POUR ADMINISTRATION */}
        <Route path='/administration' element={<><NavBar/><Administration/><Footer/></>}/>
        <Route path='/administration/inscription' element={<><NavBar/><FormulaireInscription/><Footer/></>}/>
        <Route path='/administration/jeu' element={<><NavBar/><FormulaireJeu/><Footer/></>}/>
        <Route path='/administration/jeu/:id' element={<><NavBar/><FormulaireJeu/><Footer/></>}/>
        <Route path='/administration/rendu' element={<><NavBar/><FormulaireRendu/><Footer/></>}/>
        <Route path='/administration/rendu/:id' element={<><NavBar/><FormulaireRendu/><Footer/></>}/>
        <Route path='/administration/materiel-cl' element={<><NavBar/><FormulaireCreativeLab/><Footer/></>}/>
        <Route path='/administration/materiel-cl/:id' element={<><NavBar/><FormulaireCreativeLab/><Footer/></>}/>
      </Routes>
    </>
  );
}

export default App;
