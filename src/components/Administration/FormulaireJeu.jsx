import React from 'react'
import './formulaire.css'
import { getStorage, ref as refST, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { child, get, getDatabase, ref as refDB, set, update } from "firebase/database";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { modificationFormulaire } from '../../helpers/fonctionsFormulaires';
import { useNavigate } from 'react-router-dom';
import { estConnecte } from '../../helpers/compte';
import { compresserImage } from '../../helpers/images';

//Composant représentant le formulaire de gestion d'un jeu (création, modification, suppression)
function FormulaireJeu(props) {
    const navigate = useNavigate(), 
        database = getDatabase(), 
        storage = getStorage(), 
        idJeu = useParams()["id"];
    
    const [compte, setCompte] = useState(false),
        [membres, setMembres] = useState([{nom:"", prenom:"", poste:""}]),
        [admins, setAdmins] = useState(new Array()),
        [utilisateurs, setUtilisateurs] = useState(new Array()),
        [formulaire, setFormulaire] = useState({
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

    //TODO Update les texte de chaque champs

    //TODO Logo/Carrousel : Gérer erreur upload
    //TODO Logo/Carrousel : Gérer erreur récupération de l'URL

    //UseEffects nécessaires à la vérification du compte
    useEffect(() => {
        setCompte(props.utilisateur);
    },[props]);

    /*
    *   Vérification du compte, récupération des informations dans la BDD, mise à jour du titre de l'onglet
    *   Si l'utilisateur est connecté :
    *       Si un jeu est demandé :
    *           Récupérer les informations du jeu
    *           Stocker jeu, membres, administrateurs
    *       Récupérer la liste des membres du site (pour liste administrateurs)
    */
    useEffect(() => {
        //Si non connecté, renvoie à l'accueil automatiquement
        if(estConnecte(compte, true, navigate))
        {
            if(idJeu)
            {
                get(child(refDB(database),`Jeu/${idJeu}`))
                .then(
                    (snapshot) => 
                    {
                        if(snapshot.exists())
                        {
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
                            setAdmins(jeu.Administrateur);
                            document.title = `Modification de ${jeu.titre} - Ludhic`;
                        }
                        else
                        {
                            alert(`Aucune donnée trouvée pour un jeu ayant l'URL ${idJeu} dans la base de données.`);
                            navigate("/administration/");
                        }
                    },
                    (error) => 
                    {
                        alert(error);
                        navigate("/administration/");
                    }
                )
                .catch((error) => alert(error));
            }
            else
            {
                setAdmins([...[compte.id]]);
                document.title = "Création de jeu - Ludhic";
            } 

            //Récupérer utilisateurs pour sélecteur admins
            get(child(refDB(database),`Compte`))
            .then((snapshot) => {
                const ut = snapshot.val();
                let listeUtilisateurs = new Array();
                Object.keys(ut).map((idUt) => listeUtilisateurs.push({id:idUt, nom:ut[idUt].Nom.toUpperCase(), prenom:ut[idUt].Prenom}));
                setUtilisateurs(listeUtilisateurs);
                setAdmins([...[compte.id]]);
            });
        }
    },[compte]);

    /*
    *   Vérification de l'accès au jeu si modification
    *   Récupérer liste administrateurs
    *   Si utilisateur n'est admin ni du jeu ni du site : revenir à l'administration
    */
    useEffect(() => {
        console.log("Admins:",admins);
        if(admins.length > 0)
        {
            if(compte.admin) console.log("Utilisateur est administrateur du site.");
            else
            {
                let estAdmin = false;
                for(let adm of admins) { if(adm == compte.id) { estAdmin = true; break; } }
                if(estAdmin) console.log("Utilisateur est administrateur du jeu");
                else { console.log("Utilisateur n'est admin ni du site, ni du jeu"); navigate("/"); }
            }
        }
    },[admins]);

    /*
    *   Fonctions de gestion des Participants et Administrateurs :
    *   Les deux sont des listes de champs qui peuvent être créés ou détruits.
    *   Chacunes sont gérées par 3 fonctions :
    *       - creerChamp : Rajoute un champ à la liste en ajoutant une donnée dans l'array correspondant
    *       - supprimerChamp : Supprime un champ précis grâce à son emplacement dans la liste
    *       - modification : Equivalant à modificationFormulaire, met à jours les données dans l'array correspondant
    */

    //PARTICIPANTS
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
        console.log(nouveauxMembres);
    }
    
    //ADMINISTRATEURS
    const creerChampAdministrateurs = () => {
        setAdmins([...admins,compte.id]);
    }

    const supprimerChampAdministrateurs = (index) => {
        let nouveauFormulaire = [...admins];
        nouveauFormulaire.splice(index, 1);
        setAdmins(nouveauFormulaire);
    }

    const modificationAdministrateurs = (index, input) => {
        let nouveauxAdmins = [...admins];
        nouveauxAdmins[index] = input.target.value;
        setAdmins(nouveauxAdmins);
    }

    /*
    *   Fonctions de mise en ligne des images
    *   uploadLogo : Met en ligne le logo et met à jour l'URL de l'image dans la base de données.
    *   uploadCarrousel : Met en ligne la/les image(s) donnée(s) dans leur ordre d'origine, et renvoie une liste des URL.
    */
    const uploadLogo = (jeu, image) => {
        return new Promise((resolve, reject) => {
            //Compresse l'image, puis la met en ligne, puis envoie l'URL dans la base de données
            compresserImage(image, 500, 500, "PNG")
            .then(
                (imgCompresse) => 
                uploadBytes(refST(storage, `Jeux/Logo/${jeu}.png`), imgCompresse)
                .then(
                    (snapshot) => 
                    getDownloadURL(snapshot.ref)
                    .then(
                        (localURL) => update(refDB(database, `Jeu/${jeu}`), {Logo: localURL})
                            .then(
                                () => resolve(),
                                () => reject("Erreur de stockage de l'URL du logo dans la base de données. Celui-ci est en ligne, un administrateur peut terminer le processus manuellement.")
                            ),
                        () => reject("Erreur de récupération de l'URL du logo sur le serveur. Il a été mis en ligne, un administrateur peut terminer le processus manuellement.")
                    ),
                    () => reject("Erreur de mise en ligne du logo.")
                ),
                () => reject("Erreur de compression du logo. Celui-ci n'as pas été mis en ligne.")
            )
        });
    }

    const uploadCarrousel = (jeu, listeImages) => {
        return new Promise((resolve, reject) => {
            //Compression des images
            Promise.all(listeImages.map(image => { return compresserImage(image, 1920, 1080, "JPEG", 80); }))
            .then(
                //Mise en ligne des images
                (listeImagesCompresse) => {
                    Promise.all(listeImagesCompresse.map(imageCompresse => { return uploadBytes(refST(storage, `Jeux/Carrousel/${jeu}/${imageCompresse.name}`), imageCompresse);}))
                    .then(
                        (SnapshotsUploadImages) => {
                            Promise.all(SnapshotsUploadImages.map(snap => { return getDownloadURL(snap.ref); }))
                            .then(
                                (listeUrls) => resolve(listeUrls),
                                () => reject("Erreur de récupération des URLs des images du carrousel mises en ligne. Un administrateur peut les récupérer et insérer manuellement.")
                            );
                        },
                        () => reject("Erreur de mise en ligne des images du carrousel. Elles n'ont pas été enregistrées.")
                    )
                },
                () => reject("Erreur de compression des images du carrousel. Elles n'ont pas été enregistrées.")
            );
        });
    }

    //Composants avec condition d'affichage
    const AncienneImage = (props) => {
        if(props.url) return (<img className="form-image-edition" src={props.url} alt={props.alt}/>)
    }

    /*
    *   CreerJeu :
    *   Vérifie si l'url n'est pas déjà pris (évite overwrite de données)
    *   Créé le jeu dans la BDD avec toutes les info
    *   Uploade le Logo et le Carrousel
    *   Met à jour la BDD avec les url des images
    */
    const creerJeu = (event) => {
        event.preventDefault();

        //Utilisé uniquement pour les Input=File
        const form = event.target;

        get(child(refDB(database),`Jeu`))
        .then(
            (snapshot) =>
            {
                if(snapshot.exists)
                {
                    const listeUrlJeux = Object.keys(snapshot.val() || {});
                    if(listeUrlJeux.includes(formulaire.url)) alert("Attention : cet URL est déjà pris. Veuillez en changer.");
                    else
                    {
                        //Créer jeu dans BDD avant de tenter uploads
                        //Les valeurs FALSE sont des placeholders pour créer les champs "vides"
                        set(refDB(database,`Jeu/${form.url.value}`), {
                            Administrateur: admins,
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
                            Visible: formulaire.visible,
                            Membre: membres
                        })
                        .then(
                            () => {
                                //Upload des images (Logo & Carrousel)
                                const promiseLogo = uploadLogo(formulaire.url, form.logo.files[0]);
                                promiseLogo.catch(
                                    (error) => {
                                        update(refDB(database, `Jeu/${formulaire.url}`), {Logo: "https://via.placeholder.com/150?text=" + formulaire.url})
                                        .then(
                                            () => alert(error + " Une image temporaire a été associée au jeu."),
                                            () => alert(error + " Aucune image de logo n'a pu être associée au jeu. Veuillez contacter un administrateur.")
                                        )
                                    }
                                );

                                let imagesCarrousel = new Array(form.car_1.files[0]);
                                if(form.car_2.files.length !== 0) imagesCarrousel.push(form.car_2.files[0]);
                                if(form.car_3.files.length !== 0) imagesCarrousel.push(form.car_3.files[0]);
                                if(form.car_4.files.length !== 0) imagesCarrousel.push(form.car_4.files[0]);

                                const promiseCarrousel = uploadCarrousel(formulaire.url, imagesCarrousel)
                                promiseCarrousel.then(
                                    (listeUrlImages) => {
                                        update(refDB(database, `Jeu/${formulaire.url}`), {Carrousel: listeUrlImages})
                                        .catch((error) => alert("Erreur de stockage des URLs des images. Celles-ci sont en ligne, un administrateur peut finir le processus manuellement."));
                                    }
                                );

                                Promise.all([promiseLogo, promiseCarrousel])
                                .then(
                                    () => {
                                        alert(`Le jeu ${formulaire.titre} a été créé avec l'url ${formulaire.url} sans erreurs.`);
                                        navigate("/administration/");
                                    },
                                    (error) => {
                                        alert(`Le jeu ${formulaire.titre} a été créé avec l'url ${formulaire.url} avec les erreurs suivantes : ${error}.`);
                                        navigate("/administration/");
                                    }
                                );
                            },
                            () => {
                                alert('La mise en ligne des données dans la base de données a subis une erreur. Le jeu n\'a pas été créé.');
                            }
                        )
                    }
                }
            }
        );
    }

    const modifierJeu = (event) => {
        event.preventDefault();

        const form = event.target;

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
            Membre: membres,
            Administrateur: admins
        })
        .then(
            () => {
                let arrayPromiseImages = new Array();

                //Modification logo si demandé
                if(form.logo.files.length !== 0) arrayPromiseImages.push(uploadLogo(formulaire.url,form.logo.files[0]));

                const tailleCarrousel = formulaire.carrousel.length;
                const listeInputs = document.querySelectorAll(".input-carrousel");

                /* 
                *   Si le carrousel avant modification n'a pas 4 images, alors possibilité d'en rajouter
                *   Récupère les images à rajouter
                *   S'il y en a :
                *       Upload les images
                *       Récupérer les URL
                *       Les rajouter à la liste existante dans la BDD
                */
                if(tailleCarrousel < 4)
                {
                    let listeImages = new Array();
                    for(let i = tailleCarrousel; i < 4; i++)
                    {
                        if(listeInputs[i].files.length !== 0) listeImages.push(listeInputs[i].files[0]);
                    }
                    if(listeImages.length !== 0)
                    {
                        const promiseNewCarrousel = uploadCarrousel(formulaire.url, listeImages);
                        arrayPromiseImages.push(promiseNewCarrousel);
                        promiseNewCarrousel.then(
                            (listeUrlImages) => {
                                let compteId = tailleCarrousel;
                                listeUrlImages.forEach(url => {
                                    update(refDB(database, `Jeu/${formulaire.url}/Carrousel`), {[compteId]: url});
                                    compteId++;
                                })
                            },
                            (error) => alert(error + " Les images à rajouter au carrousel n'ont pas été prises en compte.")
                        );
                    }
                }

                for(let i = 0; i < tailleCarrousel; i++)
                {
                    if(listeInputs[i].files.length !== 0)
                    {
                        const image = listeInputs[i].files[0];
                        const promiseRemplacerCarrousel = uploadCarrousel(formulaire.url, [image]);
                        arrayPromiseImages.push(promiseRemplacerCarrousel);
                        promiseRemplacerCarrousel.then(
                            (url) => {
                                const newUrl = (Array.isArray(url)) ? url[0] : url;
                                update(refDB(database, `Jeu/${formulaire.url}/Carrousel`), {[i]: url})
                                .catch(() => alert("Erreur de mise à jour d'une image du carrousel à remplacer. La nouvelle image est en ligne, un administrateur peut terminer le processus manuellement."));
                            },
                            (error) => alert(error + " L'image n'a pas été remplacée.")
                        );
                    }
                }

                Promise.all(arrayPromiseImages)
                .then(
                    () => {
                        alert('Mise à jours du jeu terminée sans erreurs.');
                        navigate("/administration/");
                    },
                    (error) => {
                        alert('Mise à jours du jeu terminée avec les erreurs suivantes : ' + error);
                        navigate("/administration/");
                    }
                );
            }
            ,
            () => alert('Erreur lors de la mise à jour des données dans la base de données.'))
    }    

    return (
        <>
        <div className='form-body'>
            <h1 className='form-title'>Administration jeux</h1>
            <form onSubmit={(idJeu) ? modifierJeu : creerJeu} className='form'>
                <div className='form-line'></div>

    {/* INFORMATIONS PRINCIPALES */}

                <div className='form-intro'>
                    <p>Vous êtes sur la page d'administration des jeux, vous pourrez modifier, ajouter ou retirer toute information plus tard.<br/>
                    Pour tout problème rencontré contacter </p>
                    <a href="mailto:ludhic.association@gmail.fr">ludhic.association@gmail.com</a>
                </div>
                <h2 className='form-title-h2'>Informations principales</h2>
                <div className='form-component'>
                    <label htmlFor="titre">Nom du jeu* : </label>
                    <input name="titre" type="text" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.titre}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="annee">Année* : </label>
                    <p className='form-text'>Année de fin du projet (pour l'année scolaire 2021-2022, écrire 2022)</p>
                    <input name="annee" type="number" min="2000" max="2100" maxLength={64} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.annee}/>
                </div>
                {
                    //Afficher le champ URL si création d'un jeu
                    !idJeu && (
                        <div className='form-component'>
                            <label htmlFor="url">URL de la page* : </label>
                            <p className='form-text'>Nom de l'url de la page du jeu (Exemple : MONJEU donnera ludhic.fr/jeux/MONJEU). Il n'est plus modifiable après la création.</p>
                            <input name="url" type="text" pattern='[a-zA-Z0-9]+' maxLength={32} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.url}/>
                        </div>
                    )
                }
                <div className='form-component'>
                    <label htmlFor="desc_court">Description courte* : </label>
                    <p className='form-text'>Utilisée dans la liste de tous les jeux. Longueur maximale de 120 caractères</p>
                    <textarea name="desc_court" cols="80" rows="3" type="text" maxLength={120} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.desc_court}></textarea>
                </div>
                <div className='form-component'>
                    <label htmlFor="desc_long">Description longue* : </label>
                    <p className='form-text'>Utilisée dans la page du jeu. Longueur maximale de 516 caractères</p>
                    <textarea name="desc_long" cols="80" rows="8" type="text" maxLength={516} required='required' onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.desc_long}></textarea>
                </div>
                <div className='form-component'>
                    <label htmlFor="logo">Logo* : </label>
                    <p className='form-text'>Image au format 1:1 (Exemple : 500x500) </p>
                    <input name="logo" type="file" accept="image/png, image/jpeg" required={(!idJeu)}/>
                    <AncienneImage url={formulaire.logo} alt={"Logo du jeu"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="ytb">Lien vidéo Youtube : </label>
                    <p className='form-text'>Lien vers une vidéo Youtube (Exemple : Gameplay, Trailer, etc...)</p>
                    <input name="ytb" type="text" maxLength={255} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.ytb}/>
                </div>

    {/* BOUTON */}

                <div className='form-line'></div>
                <h2 className='form-title-h2'>Bouton</h2>
                <div className='form-component'>
                    <label htmlFor="txt_btn">Nom du bouton : </label>
                    <p className='form-text'>Texte affiché sur le bouton</p>
                    <input name="txt_btn" type="text" maxLength={32} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.txt_btn} />
                </div>
                <div className='form-component'>
                    <label htmlFor="lien_btn">Lien du bouton : </label>
                    <p className='form-text'>Lien vers lequel le bouton redirige (Exemple : Itch.io, site du jeu, etc.)</p>
                    <input name="lien_btn" type="text" maxLength={255} onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} value={formulaire.lien_btn} />
                </div>
                
    {/* CARROUSEL */}
                
                <div className='form-line'></div>
                <h2 className='form-title-h2'>Carrousel</h2>
                <div className='form-component'>
                    <label htmlFor="car_1">Image 1{!idJeu && ("*")} : </label>
                    <p className='form-text'>Priviliégiez les images au format 16:9 (Exemple : 1920x1080). La présence d'au moins une image est obligatoire.</p>
                    <input className="input-carrousel" name="car_1" type="file" accept="image/png, image/jpeg" required={(!idJeu)}/>
                    <AncienneImage url={formulaire.carrousel[0]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_2">Image 2 : </label>
                    <input className="input-carrousel" name="car_2" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[1]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_3">Image 3 : </label>
                    <input className="input-carrousel" name="car_3" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[2]} alt={"Image du carrousel"}/>
                </div>
                <div className='form-component'>
                    <label htmlFor="car_4">Image 4 : </label>
                    <input className="input-carrousel" name="car_4" type="file" accept="image/png, image/jpeg"/>
                    <AncienneImage url={formulaire.carrousel[3]} alt={"Image du carrousel"}/>
                </div>

    {/* PARTICIPANTS */}

                <div className='form-line'></div>
                <h2 className='form-title-h2'>Participants</h2>
                <button type='button' className='add-student' onClick={() => creerChampParticipant()}>Ajouter participant</button>
                <div className='participant-container'>
                {
                    membres.map((element, index) => (
                        <div key={`participant-${index}`} className="participant form-component">

                            <label htmlFor="prenom">Prénom* : </label>
                            <input name="prenom" type="text" required='required' value={element.prenom || ""} onChange={input => modificationMembres(index, input)} />

                            <label htmlFor="nom">Nom* : </label>
                            <input name="nom" type="text" required='required' value={element.nom || ""} onChange={input => modificationMembres(index, input)} />

                            <label htmlFor="poste">Poste(s)* : </label>
                            <input name="poste" type="text" required='required' value={element.poste || ""} onChange={input => modificationMembres(index, input)} />
                            {
                                index ? 
                                    <button type='button' className='rm-student' onClick={() => supprimerChampParticipant(index)}>Supprimer le participant</button>
                                : null
                            }
                        </div>
                    ))
                }
                </div>

    {/* ADMINISTRATEURS */}

                <div className='form-line'></div>
                <h2 className='form-title-h2'>Administrateurs du jeu</h2>
                <p className=''>Liste de toutes les personnes (hors administrateurs du site) pouvant éditer la page du jeu.</p>
                <button type='button' className='add-admin' onClick={() => creerChampAdministrateurs()}>Ajouter administrateur</button>

                {
                    admins.map((element, index) => (
                        <div key={`adm-${index}`} className="participant form-component">

                            <select name="adm" value={element} onChange={input => modificationAdministrateurs(index, input)}>
                                {
                                    utilisateurs.map((element) => (
                                        <option key={element.id+element.nom} value={element.id}>{element.nom} {element.prenom}</option>
                                    ))
                                }
                            </select>
                            {
                                index ? 
                                    <button type='button' className='rm-admin' onClick={() => supprimerChampAdministrateurs(index)}>Supprimer l'administrateur</button>
                                : null
                            }
                        </div>
                    ))
                }

    {/* BOUTON JEU VISIBLE */}

                <div className='checkbox-atc'>
                    <input name="visible" type="checkbox" onChange={event => modificationFormulaire(event, formulaire, setFormulaire)} checked={formulaire.visible}/>
                    <label htmlFor="url">Rendre la page de mon jeu visible.</label>                        
                </div>

    {/* CHECKBOX */}
                <div className='checkbox-atc'>
                    <input type="checkbox" required='required'/>
                    <label htmlFor="checkbox-atc">Je certifie avoir toutes les autorisations à la création et/ou modification de cette page.*</label>
                </div>

    {/* BOUTON ENVOIE FORMULAIRE */}
                <p className='form-text'>* : Champ obligatoire</p>
                <div className='form-component'>
                    <input name="img1" className='send-form' type="submit" value="Envoyer le formulaire" />
                </div>
            </form>
        </div>
        </>
    )
}

export default FormulaireJeu