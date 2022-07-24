import React from 'react'
import '../formulaire.css'
import { getStorage, ref as refST, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { child, get, getDatabase, ref as refDB, set, update } from "firebase/database";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { modificationFormulaire } from '../fonctionsFormulaires';

//Composant représentant le formulaire de gestion d'un jeu (création, modification, suppression)
function FormulaireJeu() {
    const database = getDatabase(), storage = getStorage(), idJeu = useParams()["id"];
    const [membres, setMembres] = useState([{nom:"", prenom:"", poste:""}]);
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
        carrousel: [],
        visible: false,
        admins: ""
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
                    carrousel: jeu.Carrousel,
                    visible: jeu.Visible,
                    admins: jeu.Demandes_Administrateurs
                });
                setMembres(jeu.Membre);
            });
            //TODO Gérer erreur requête
            //TODO Gérer absence jeu à cet ID
        }
    },[]);

    const creerChampParticipant = () => {
        setMembres([...membres,{nom:"", prenom:"", poste:""}]);
    }

    const supprimerChampParticipant = (index) => {
        let nouveauFormulaire = [...membres];
        nouveauFormulaire.splice(index, 1);
        setMembres(nouveauFormulaire);
    }

    const modificationMembres = (index, input) => {
        let nouveauxMembres = [...membres];
        nouveauxMembres[index][input.target.name] = input.target.value;
        setMembres(nouveauxMembres);
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
            Titre: formulaire.titre,
            Visible: false,
            Demandes_Administrateurs: formulaire.admins,
            Membre: membres
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
        if(form.car_2.files.length !== 0) imagesCarrousel.push(form.car_2.files[0]);
        if(form.car_3.files.length !== 0) imagesCarrousel.push(form.car_3.files[0]);
        if(form.car_4.files.length !== 0) imagesCarrousel.push(form.car_4.files[0]);

        // Upload les images dans l'ordre et récupère les URL pour Carrousel
        // Code volé ici : https://stackoverflow.com/questions/41673499/how-to-upload-multiple-files-to-firebase/67513322#67513322
        Promise.all(
            imagesCarrousel.map(image => {
                return uploadBytes(refST(storage, `Jeux/Carrousel/${formulaire.url}/${image.name}`), image);
            })
        )
        .then((snapshots) => {
            Promise.all(
                snapshots.map(snapshot => {
                    return getDownloadURL(snapshot.ref);
                })
            )
            .then((listeUrl) => {
                update(refDB(database, `Jeu/${formulaire.url}`), {Carrousel: listeUrl});
            })
        });

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
            Titre: formulaire.titre,
            Visible: formulaire.visible,
            Demandes_Administrateurs: formulaire.admins,
            Membre: membres
        });

        //Modification logo si demandé
        if(form.logo.files.length !== 0)
        {
            deleteObject(refST(storage, formulaire.logo))
            .then(uploadLogo(formulaire.url,form.logo.files[0]));
        }

        //TODO Modification du carrousel
        /*
        *   Modification du Carrousel :
        *   Le Carrousel possède au minimum 1 image
        *   Si un Input correspondant à une image déjà présente, remplacer l'image
        *   Si input n'as pas d'image qui va avec, rajouter l'image à la bonne place dans la liste
        */

        /* 
            taille = carrousel.length
            inputs = liste des input files, dans l'ordre
            si taille < 4
                faire un for sur les inputs à partir de 1ere place vide
                    ajouter fichier dans liste qui sera uploadée
                si liste non vide
                    uploader images
                    rajouter URL en fin de liste
            quoi qu'il en soit
                for sur les inputs de 0 à taille
                    si input a une image
                        Uploader
                        remplacer URL à l'ID correspondant
        */

        const tailleCarrousel = formulaire.carrousel.length;
        const listeInputs = document.querySelectorAll(".input-carrousel");
        
        if(tailleCarrousel < 4)
        {
            let listeImages = new Array();
            for(let i = tailleCarrousel; i < 4; i++)
            {
                if(listeInputs[i].files.length !== 0) listeImages.push(listeInputs[i].files[0]);
            }
            if(listeImages.length !== 0)
            {
                Promise.all(
                    listeImages.map(image => {
                        return uploadBytes(refST(storage, `Jeux/Carrousel/${formulaire.url}/${image.name}`), image);
                    })
                )
                .then((snapshots) => {
                    Promise.all(
                        snapshots.map(snapshot => {
                            return getDownloadURL(snapshot.ref);
                        })
                    )
                    .then((listeUrl) => {
                        let compteId = tailleCarrousel;
                        listeUrl.forEach(url => {
                            update(refDB(database, `Jeu/${formulaire.url}/Carrousel`), {[compteId]: url});
                            compteId++;
                        });
                    })
                });
            }
        }

        for(let i = 0; i < tailleCarrousel; i++)
        {
            if(listeInputs[i].files.length !== 0)
            {
                const image = listeInputs[i].files[0];
                uploadBytes(refST(storage, `Jeux/Carrousel/${formulaire.url}/${image.name}`), image)
                .then(snapshot => {
                    getDownloadURL(snapshot.ref)
                    .then(url => {
                        update(refDB(database, `Jeu/${formulaire.url}/Carrousel`), {[i]: url});
                    })
                })
            }
        }
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
                    <input name="titre" type="text" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.titre}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="annee">Année* : </label>
                    <p className='form-texte'>Année de la rentrée (Exemple : Si l'année est 2021-2022 alors écriver 2021)</p>
                    <input name="annee" type="number" min="2000" max="2100" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.annee}/>
                </div>
                {
                    //Afficher le champ URL si création d'un jeu
                    !idJeu && (
                        <div className='form-component'>
                            <label htmlFor="url">URL de la page* : </label>
                            <p className='form-texte'>Nom de l'url de la page du jeu (Exemple : MONJEU donnera ludhic.fr/jeux/MONJEU)</p>
                            <input name="url" type="text" maxLength={32} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.url}/>
                        </div>
                    )
                }
                <div className='form-component'>
                    <label htmlFor="desc_court">Description courte* : </label>
                    <p className='form-texte'>Longueur maximale de X caractères</p>
                    <textarea name="desc_court" cols="80" rows="3" type="text" maxLength={120} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.desc_court}></textarea>
                </div>
                <div className='form-component'>
                    <label htmlFor="desc_long">Description longue* : </label>
                    <p className='form-texte'>Longueur maximale de X caractères</p>
                    <textarea name="desc_long" cols="80" rows="8" type="text" maxLength={516} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.desc_long}></textarea>
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
                    <input name="ytb" type="text" maxLength={32} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.ytb}/>
                </div>

    {/* BOUTON */}

                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Bouton</h2>
                <div className='form-component'>
                    <label htmlFor="txt_btn">Nom du bouton : </label>
                    <p className='form-texte'>Texte affiché sur le bouton</p>
                    <input name="txt_btn" type="text" maxLength={32} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.txt_btn} />
                </div>
                <div className='form-component'>
                    <label htmlFor="lien_btn">Lien du bouton : </label>
                    <p className='form-texte'>Lien vers lequel le bouton redirige (Exemple : Itch.io)</p>
                    <input name="lien_btn" type="text" maxLength={255} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.lien_btn} />
                </div>
                
    {/* CARROUSEL */}
                
                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Carrousel</h2>
                <div className='form-component'>
                    <label htmlFor="car_1">Image 1* : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input className="input-carrousel" name="car_1" type="file" accept="image/png, image/jpeg" required={(!idJeu)}/>
                    <AncienneImage url={formulaire.carrousel[0]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_2">Image 2 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input className="input-carrousel" name="car_2" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[1]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_3">Image 3 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input className="input-carrousel" name="car_3" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[2]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_4">Image 4 : </label>
                    <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                    <input className="input-carrousel" name="car_4" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[3]} alt={"Image du carrousel"}/>
                </div>

    {/* MEMBRES */}

                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Propriétaire de la page</h2>
                <div className='form-component'>
                    <label htmlFor="admins">Propriétaire de la page : </label>
                    <p className='form-texte'>Les propriétaires de la page pouront l'éditer en intégralité, renseigner le prénom et le nom de chacun<br/>
                    Le créateur de la page sera par défaut propriétaire. Si personne n'est renseigné vous serez la seule personne propriétaire de la page</p>
                    <textarea name="admins" cols="80" rows="5" type="text" maxLength={516} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.admins}></textarea>
                </div>

    {/* PARTICIPANTS */}

                <div className='form-ligne'></div>
                <h2 className='form-titre-h2'>Participants</h2>
                <button type='button' className='bouton-ajout-participant' onClick={() => creerChampParticipant()}>Ajouter participant</button>

                {
                    membres.map((element, index) => (
                        <div key={`participant-${index}`} className="participant form-component">
                            <h2>Participant</h2>
                            <label htmlFor="prenom">Prénom* : </label>
                            <input name="prenom" type="text" required='required' value={element.prenom || ""} onChange={input => modificationMembres(index, input)} />

                            <label htmlFor="nom">Nom* : </label>
                            <input name="nom" type="text" required='required' value={element.nom || ""} onChange={input => modificationMembres(index, input)} />

                            <label htmlFor="poste">Poste* : </label>
                            <input name="poste" type="text" required='required' value={element.poste || ""} onChange={input => modificationMembres(index, input)} />
                            {
                                index ? 
                                    <button type="button" className='bouton-supr-participant' onClick={() => supprimerChampParticipant(index)}>Supprimer le participant</button>
                                : null
                            }
                        </div>
                    ))
                }

    {/* BOUTON ENVOIE FORMULAIRE */}

                {
                    //Afficher la checkbox d'affichage du jeu si existe
                    idJeu && (
                        <div className='form-component'>
                            <label htmlFor="url">Rendre le jeu visible dans la liste : </label>
                            <input name="visible" type="checkbox" onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} checked={formulaire.visible}/>
                        </div>
                    )
                }

                <p className='form-texte'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Envoyer le formulaire" />
                </div>


            </form>
        </>
    )
}

export default FormulaireJeu