/**
*   La fonction permet de mettre à jour les informations de State lié à un formulaire à chaque modification de données.
*   @param  {Event} event L'évènement permettant de récupérer les données du champ modifié
*   @param  {Array} stateVar Le State Array dans son état actuel.
*   @param  {Function} stateSetterFunction La fonction de mise à jour du State Array
*/
export function modificationFormulaire(event, stateVar, stateSetterFunction) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    stateVar[name] = value;
    stateSetterFunction({...stateVar});

    console.log(stateVar);
}