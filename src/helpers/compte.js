import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function estConnecte(utilisateur, changerPage = false, navigate, redirection = "/") {
    if(typeof utilisateur === "object")
    {
        if(utilisateur.id) return true;
        else
        {
            if(changerPage) navigate(redirection);
            return false;
        }
    }
}