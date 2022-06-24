import './App.css';
import Nav from './components/Nav/Nav';
import DetailJeu from './components/DetailJeu/DetailJeu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Accueil from './components/Accueil/Accueil';
import Jeux from './components/Jeux/Jeux';
import {Routes, Route} from "react-router-dom"
import AdministrationJeu from './components/AdministrationJeu/AdministrationJeu';

function App() {
  return (
    <>
      <Routes>
        <Route path='/jeux/:id' element={<><Nav/><DetailJeu/><Footer/></>}/>
        <Route path='/' element={<><Nav/><Header/><Accueil/><Footer/></>}/>
        <Route path='/jeux' element={<><Nav/><Header/><Jeux/><Footer/></>}/>
        <Route path='/admin-jeu' element={<><Nav/><Header/><AdministrationJeu/><Footer/></>}/>
        <Route path='/admin-jeu/:id' element={<><Nav/><Header/><AdministrationJeu/><Footer/></>}/>
      </Routes>
    </>
  );
}

export default App;
