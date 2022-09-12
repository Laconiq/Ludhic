/** 
*   La fonction vérifie si un utilisateur est connecté au moment présent.
*   @param  {Object}            utilisateur Un objet représentant un utilisateur.
*   @param  {Boolean}           changerPage Renvoyer à une autre page si l'utilisateur n'est pas connecté.
*   @param  {NavigateFunction}  navigate    La fonction de renvoie à une autre page.
*   @param  {String}            redirection L'extension d'url de la page à accéder.
*   @return {Boolean} True si l'utilisateur est connecté.
*/
export function estConnecte(utilisateur, changerPage = false, navigate, redirection = "/") {
    if(typeof utilisateur === "object")
    {
        if(utilisateur.id) return true;
        else
        {
            if(changerPage) 
            {
                alert("L'accès à cette page demande d'être connecté.");
                navigate(redirection);
            }
            return false;
        }
    }
}