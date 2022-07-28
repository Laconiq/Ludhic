import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function estConnecte(changerPage = false, redirection = "/") {
    onAuthStateChanged(getAuth(), (user) => {
        if(user)
        {
            //TODO vérifier que le compte a des données dans la BDD
            return true;
        }
        else
        {
            const navigate = useNavigate();
            if(changerPage) navigate(redirection);
            else return false;
        }
    });
}

export function estAdmin(changerPage = false, redirection = "/") {
    //TODO récupérer données du compte sur la BDD
    //Retourner valeur de Compte/Admin (true ou false)
    //Si false et changerpage, redirect à redirection
}