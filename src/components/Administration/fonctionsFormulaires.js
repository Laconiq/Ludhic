//Fonctions de gestion des données du formulaire
export function modificationFormulaire(event, stateVar, stateSetterFunction) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    stateVar[name] = value;
    stateSetterFunction({...stateVar});

    console.log(stateVar);
}