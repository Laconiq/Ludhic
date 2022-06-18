import React from 'react'
import './administrationjeu.css'
import { getStorage, ref as refST, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as refDB, set, update } from "firebase/database";

function AdministrationJeu() {
    const creerJeu = (event) => {
        //TODO Récupérer informations du formulaire
        //TODO Créer jeu dans la BDD Firebase
        //TODO Renvoyer vers accueil ?
        event.preventDefault();

        const form = event.target;

        //Créer jeu dans BDD avant de tenter uploads
        //Les valeurs FALSE sont des placeholders pour créer les champs "vides"
        //TODO Récupérer les valeurs des champs absents (année, vidéo, admin)
        const db = getDatabase();
        set(refDB(db,`Jeu/${form.url.value}`), {
            Administrateur: false, //TODO Donner premier admin quand connexion ok
            Annee: 1999, //TODO Récupérer année + rajouter dans table Annee
            Carrousel: false,
            Description: form.desc_long.value,
            Description_Courte: form.desc_court.value,
            Favoris: [],
            Lien_Bouton: form.lien_btn.value,
            Lien_Video: "", //TODO Récupérer lien vidéo
            Logo: "",
            Membre: false,
            Texte_Bouton: form.txt_btn.value,
            Titre: form.titre.value
        });

        //TODO Gérer erreur création jeu dans BDD
        /* 
        *   Si erreur :
        *       - Arrêter création ici
        *       - Afficher message d'erreur
        */

        //Uploader le Logo et la 1ere image du carrousel
        const storage = getStorage();
        const logoRef = refST(storage, `Jeux/Logo/${form.url.value}.${form.logo.files[0].name.split('.').pop()}`);
        const carrouselRef1 = refST(storage, `Jeux/Carrousel/${form.url.value}_1.${form.car_1.files[0].name.split('.').pop()}`);

        uploadBytes(logoRef, form.logo.files[0])
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
            .then((localURL) => {
                update(refDB(db, `Jeu/${form.url.value}`), {Logo: localURL});
            })
            //TODO gérer impossibilité récupérer URL
        })
        .catch(() => {console.log("Erreur lors de l'upload du logo.")}); //TODO gérer erreur upload Logo

        //TODO Uploader tout le carrousel
        /* 
        *   Faire une boucle sur les fichiers d'un seul input ?
        */
        uploadBytes(carrouselRef1, form.car_1.files[0])
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
            .then((localURL) => {
                update(refDB(db, `Jeu/${form.url.value}`), {Carrousel: [localURL]});
            }) 
            //TODO gérer impossibilité récupérer URL
        })
        .catch(() => {console.log("Erreur lors de l'upload du carrousel 1.")}); //TODO gérer erreur upload Carrousel 1

        alert(`Le jeu ${form.titre.value} a été créé avec succès (normalement, sinon c'est la faute de Lucas).`);
    }

    return (
        <>
            <h1 className='form-titre'>Administration jeux</h1>
            <form onSubmit={creerJeu} className='form'>
                <div className='form-ligne'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <p>Vous êtes sur la page d'administration des jeux, vous pourrez modifier, ajouter ou retirer toutes informations plus tard.<br/>
                Pour tout problème rencontré contacter email@email.fr</p>
                <h2 className='form-titre-h2'>Informations principales</h2>
                <div className='form-component'>
                    <label htmlFor="titre">Nom du jeu* : </label>
                    <input name="titre" type="text" maxLength={64} required='required'/>
                </div>
                <div className='form-component'>
                    <label htmlFor="url">URL de la page* : </label>
                    <p className='form-texte'>Nom de l'url de la page du jeu (Exemple : ludhic.fr/jeux/monjeu)</p>
                    <input name="url" type="text" maxLength={32} required='required'/>
                </div>
                <div className='form-component'>
                    <label htmlFor="desc_court">Description courte* : </label>
                    <p className='form-texte'>Longueur maximale de X caractères</p>
                    <textarea name="desc_court" cols="80" rows="3" type="text" maxLength={120} required='required'></textarea>
                </div>
                <div className='form-component'>
                    <label htmlFor="desc_long">Description longue* : </label>
                    <p className='form-texte'>Longueur maximale de X caractères</p>
                    <textarea name="desc_long" cols="80" rows="8" type="text" maxLength={516} required='required'></textarea>
                </div>
                <div className='form-component'>
                    <label htmlFor="logo">Logo* : </label>
                    <p className='form-texte'>Image au format 1:1 (Exemple : 500x500) </p>
                    <input name="logo" type="file" accept="image/png, image/jpeg" required='required'/>
                </div>

    {/* BOUTON */}

                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Bouton</h2>
                <div className='form-component'>
                    <label htmlFor="txt_btn">Nom du bouton : </label>
                    <p className='form-texte'>Texte affiché sur le bouton</p>
                    <input name="txt_btn" type="text" maxLength={32} />
                </div>
                <div className='form-component'>
                    <label htmlFor="lien_btn">Lien du bouton : </label>
                    <p className='form-texte'>Lien vers lequel le bouton redirige (Exemple : Itch.io)</p>
                    <input name="lien_btn" type="text" maxLength={255} />
                </div>
                
    {/* CARROUSEL */}
                
                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Carrousel</h2>
                <div className='form-component'>
                    <label htmlFor="car_1">Image 1* : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_1" type="file" accept="image/png, image/jpeg" required='required'/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_2">Image 2 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_2" type="file" accept="image/png, image/jpeg"/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_3">Image 3 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_3" type="file" accept="image/png, image/jpeg"/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_4">Image 4 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_4" type="file" accept="image/png, image/jpeg"/>
                </div>
                <p className='form-texte'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Envoyer le formulaire" />
                </div>            
            </form>
        </>
    )
}

export default AdministrationJeu