import './App.css';
import Nav from './components/nav/Nav';
import DetailJeu from './components/DetailJeu/DetailJeu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Accueil from './components/Accueil/Accueil';
import Jeux from './components/Jeux/Jeux';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path='/jeux/nomdujeu' element={<><Nav/><DetailJeu/><Footer/></>}/>
        <Route path='/' element={<><Nav/><Accueil/><Footer/></>}/>
        <Route path='/jeux' element={<><Nav/><Jeux/><Footer/></>}/>
      </Routes>
    </>
  );
}

export default App;
