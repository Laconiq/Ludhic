import React from 'react'
import './administrationjeu.css'
import { getStorage, ref as refST, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { child, get, getDatabase, ref as refDB, set, update } from "firebase/database";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Composant représentant le formulaire de gestion d'un jeu (création, modification, suppression)
function AdministrationJeu() {
    const database = getDatabase(), storage = getStorage(), idJeu = useParams()["id"];
    const [formulaire, setFormulaire] = useState({
        titre: "",
        url: "",
        annee: "",
        desc_court: "",
        desc_long: "",
        ytb: "",
        txt_btn: "",
        lien_btn: "",
        logo: "",
        carrousel: []
    }); 

    //Au chargement du composant, si demande de modification d'un jeu (ID en URL), charger les informations du jeu
    useEffect(() => {
        if(idJeu)
        {
            get(child(refDB(database),`Jeu/${idJeu}`))
            .then((snapshot) => {
                const jeu = snapshot.val();
                setFormulaire({
                    titre: jeu.Titre,
                    url: idJeu,
                    annee: jeu.Annee,
                    desc_court: jeu.Description_Courte,
                    desc_long: jeu.Description,
                    ytb: jeu.Lien_Video,
                    txt_btn: jeu.Texte_Bouton,
                    lien_btn: jeu.Lien_Bouton,
                    logo: jeu.Logo,
                    carrousel: jeu.Carrousel
                });
            });
            //TODO Gérer erreur requête
            //TODO Gérer absence jeu à cet ID
        }
    },[]);

    //Fonctions de gestion des données du formulaire
    const modificationFormulaire = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        formulaire[name] = value;
        setFormulaire({...formulaire});
    }

    //TODO Renvoyer vers nouvelle page à la fin de creerJeu
    //TODO Renvoyer vers nouvelle page à la fin de modifierJeu

    const creerJeu = (event) => {
        event.preventDefault();

        //Utilisé uniquement pour les Input=File
        const form = event.target;

        //Créer jeu dans BDD avant de tenter uploads
        //Les valeurs FALSE sont des placeholders pour créer les champs "vides"
        //TODO Récupérer les valeurs des champs absents (admin)
        set(refDB(database,`Jeu/${form.url.value}`), {
            Administrateur: false, //TODO Donner premier admin quand connexion ok
            Annee: formulaire.annee,
            Carrousel: false,
            Description: formulaire.desc_long,
            Description_Courte: formulaire.desc_court,
            Favoris: false,
            Lien_Bouton: formulaire.lien_btn,
            Lien_Video: formulaire.ytb,
            Logo: false,
            Membre: false,
            Texte_Bouton: formulaire.txt_btn,
            Titre: formulaire.titre
        });

        //TODO Gérer erreur création jeu dans BDD
        /* 
        *   Si erreur :
        *       - Arrêter création ici
        *       - Afficher message d'erreur
        */

        //Upload des images (Logo & Carrousel)
        uploadLogo(formulaire.url, form.logo.files[0]);

        let imagesCarrousel = new Array(form.car_1.files[0]);
        if(form.car_2.length !== 0) imagesCarrousel.push(form.car_2.files[0]);
        if(form.car_3.length !== 0) imagesCarrousel.push(form.car_3.files[0]);
        if(form.car_4.length !== 0) imagesCarrousel.push(form.car_4.files[0]);

        // ! Erreur, 2e image est uploadée mais URL non récupéré/non mis en ligne, jsp pk
        // ! Parfois les images sont dans le mauvais ordre
        for(let i = 0; i < imagesCarrousel.length; i++)
        {
            uploadBytes(refST(storage, `Jeux/Carrousel/${formulaire.url}/${imagesCarrousel[i].name}`), imagesCarrousel[i])
            .then((snapshot) => { getDownloadURL(snapshot.ref)
                .then((localURL) => {
                    //TODO trouver truc moins sale
                    get(child(refDB(database), `Jeu/${formulaire.url}/Carrousel`))
                    .then((snapshot) => {
                        let carrouselDB = snapshot.val();
                        let newCarrousel = new Array();
                        if(carrouselDB) newCarrousel.push(...carrouselDB);
                        newCarrousel.push(localURL);
                        update(refDB(database, `Jeu/${formulaire.url}`), {Carrousel: newCarrousel});
                    });
                });
                //TODO gérer impossibilité récupérer URL
            });
            //TODO gérer erreur upload d'une des images
        }

        /*
        *   Possibilité remplacement upload carrousel :
        *   Séparer upload dans une fonction que je réutilise dans la boucle
        *   La fonction renvoie l'URL de l'image
        *   Dans la boucle, je récupère l'URL et je push dans un array
        *   à la fin, upload l'array dans la BDD
        */

        alert(`Le jeu ${form.titre.value} a été créé avec succès (normalement, sinon c'est la faute de Lucas).`);
    }

    const modifierJeu = (event) => {
        event.preventDefault();

        const form = event.target;

        //TODO Modification du Logo
        //TODO Modification du Carrousel

        //Modification valeurs depuis champs texte
        update(refDB(database, `Jeu/${formulaire.url}`), {
            Annee: formulaire.annee,
            Description: formulaire.desc_long,
            Description_Courte: formulaire.desc_court,
            Lien_Bouton: formulaire.lien_btn,
            Lien_Video: formulaire.ytb,
            Texte_Bouton: formulaire.txt_btn,
            Titre: formulaire.titre
        });

        //Modification logo si demandé
        if(form.logo.length !== 0)
        {
            deleteObject(refST(storage, formulaire.logo))
            .then(uploadLogo(formulaire.url,form.logo.files[0]));
        }

        //TODO Modification du carrousel
    }

    //Fonction upload le logo et met à jour le lien dans le jeu correspondant
    const uploadLogo = (jeu, image) => {
        uploadBytes(refST(storage, `Jeux/Logo/${jeu}.${image.name.split('.').pop()}`), image)
        .then((snapshot) => { getDownloadURL(snapshot.ref)
            .then((localURL) => { update(refDB(database, `Jeu/${jeu}`), {Logo: localURL}); })
            //TODO gérer impossibilité récupérer URL
        })
        .catch(() => {console.log("Erreur lors de l'upload du logo.")}); //TODO gérer erreur upload Logo
    }

    //Composants avec condition d'affichage
    const AncienneImage = (props) => {
        if(props.url) return ( <img src={props.url} alt={props.alt}/> )
    }

    return (
        <>
            <h1 className='form-titre'>Administration jeux</h1>
            <form onSubmit={(idJeu) ? modifierJeu : creerJeu} className='form'>
                <div className='form-ligne'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <div className='form-intro'>
                    <p>Vous êtes sur la page d'administration des jeux, vous pourrez modifier, ajouter ou retirer toutes informations plus tard.<br/>
                    Pour tout problème rencontré contacter </p>
                    <a href="mailto:ludhic.association@gmail.fr">ludhic.association@gmail.com</a>
                </div>
                <h2 className='form-titre-h2'>Informations principales</h2>
                <div className='form-component'>
                    <label htmlFor="titre">Nom du jeu* : </label>
                    <input name="titre" type="text" maxLength={64} required='required' onChange={modificationFormulaire} value={formulaire.titre}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="annee">Année* : </label>
                    <p className='form-texte'>Année de la rentrée (Exemple : Si l'année est 2021-2022 alors écriver 2021)</p>
                    <input name="annee" type="number" min="2000" max="2100" maxLength={64} required='required' onChange={modificationFormulaire} value={formulaire.annee}/>
                </div>
                {
                    //Afficher le champ URL si création d'un jeu
                    !idJeu && (
                        <div className='form-component'>
                            <label htmlFor="url">URL de la page* : </label>
                            <p className='form-texte'>Nom de l'url de la page du jeu (Exemple : MONJEU donnera ludhic.fr/jeux/MONJEU)</p>
                            <input name="url" type="text" maxLength={32} required='required' onChange={modificationFormulaire} value={formulaire.url}/>
                        </div>
                    )
                }
                <div className='form-component'>
                    <label htmlFor="desc_court">Description courte* : </label>
                    <p className='form-texte'>Longueur maximale de X caractères</p>
                    <textarea name="desc_court" cols="80" rows="3" type="text" maxLength={120} required='required' onChange={modificationFormulaire} value={formulaire.desc_court}></textarea>
                </div>
                <div className='form-component'>
                    <label htmlFor="desc_long">Description longue* : </label>
                    <p className='form-texte'>Longueur maximale de X caractères</p>
                    <textarea name="desc_long" cols="80" rows="8" type="text" maxLength={516} required='required' onChange={modificationFormulaire} value={formulaire.desc_long}></textarea>
                </div>
                <div className='form-component'>
                    <label htmlFor="logo">Logo* : </label>
                    <p className='form-texte'>Image au format 1:1 (Exemple : 500x500) </p>
                    <input name="logo" type="file" accept="image/png, image/jpeg" required={(!idJeu)}/>
                    <AncienneImage url={formulaire.logo} alt={"Logo du jeu"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="ytb">Lien vidéo Youtube : </label>
                    <p className='form-texte'>Lien vers une vidéo Youtube (Exemple : Gameplay, Trailer etc...)</p>
                    <input name="ytb" type="text" maxLength={32} onChange={modificationFormulaire} value={formulaire.ytb}/>
                </div>

    {/* BOUTON */}

                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Bouton</h2>
                <div className='form-component'>
                    <label htmlFor="txt_btn">Nom du bouton : </label>
                    <p className='form-texte'>Texte affiché sur le bouton</p>
                    <input name="txt_btn" type="text" maxLength={32} onChange={modificationFormulaire} value={formulaire.txt_btn} />
                </div>
                <div className='form-component'>
                    <label htmlFor="lien_btn">Lien du bouton : </label>
                    <p className='form-texte'>Lien vers lequel le bouton redirige (Exemple : Itch.io)</p>
                    <input name="lien_btn" type="text" maxLength={255} onChange={modificationFormulaire} value={formulaire.lien_btn} />
                </div>
                
    {/* CARROUSEL */}
                
                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Carrousel</h2>
                <div className='form-component'>
                    <label htmlFor="car_1">Image 1* : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_1" type="file" accept="image/png, image/jpeg" required={(!idJeu)}/>
                    <AncienneImage url={formulaire.carrousel[0]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_2">Image 2 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_2" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[1]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_3">Image 3 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_3" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[2]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_4">Image 4 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input name="car_4" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[3]} alt={"Image du carrousel"}/>
                </div>

    {/* PROPRIÉTAIRE */}

                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Propriétaires</h2>
                <div className='form-component'>
                    <label htmlFor="desc_long">Propriétaire de la page : </label>
                    <p className='form-texte'>Les propriétaires de la page pouront l'éditer en intégralité, renseigner le prénom et le nom de chacun<br/>
                    Le créateur de la page sera par défaut propriétaire. Si personne n'est renseigné vous serez la seule personne propriétaire de la page</p>
                    <textarea name="desc_long" cols="80" rows="5" type="text" maxLength={516}></textarea>
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