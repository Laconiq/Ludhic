import React from 'react'
import './administrationjeu.css'

function AdministrationJeu() {
  return (
    <>
        <h1 className='form-titre'>Administration jeux</h1>
        <form action="" method='post' className='form'>
            <div className='form-ligne'></div>

{/* INFORMATIONS PRINCIPALES */}

            <p>Vous êtes sur la page d'administration des jeux, vous pourrez modifier, ajouter ou retirer toutes informations plus tard.<br/>
            Pour tout problème rencontré contacter email@email.fr</p>
            <h2 className='form-titre-h2'>Informations principales</h2>
            <div className='form-component'>
                <label htmlFor="name">Nom du jeu* : </label>
                <textarea name="" id="" cols="80" rows="1" type="text" maxLength={20} required='required'></textarea>
            </div>
            <div className='form-component'>
                <label htmlFor="name">URL de la page* : </label>
                <p className='form-texte'>Nom de l'url de la page du jeu (Exemple : ludhic.fr/jeux/monjeu)</p>
                <textarea name="" id="" cols="80" rows="1" type="text" maxLength={20} required='required'></textarea>
            </div>
            <div className='form-component'>
                <label htmlFor="name">Description courte* : </label>
                <p className='form-texte'>Longueur maximale de X caractères</p>
                <textarea name="" id="" cols="80" rows="3" type="text" maxLength={50} required='required'></textarea>
            </div>
            <div className='form-component'>
                <label htmlFor="name">Description longue* : </label>
                <p className='form-texte'>Longueur maximale de X caractères</p>
                <textarea name="" id="" cols="80" rows="8" type="text" maxLength={50} required='required'></textarea>
            </div>
            <div className='form-component'>
                <label htmlFor="name">Logo* : </label>
                <p className='form-texte'>Image au format 1:1 (Exemple : 500x500) </p>
                <input type="file" accept="image/png, image/jpeg" required='required'/>
            </div>

{/* BOUTON */}

            <div className='form-ligne'></div>
            <h2 className='form-titre-h2'>Bouton</h2>
            <div className='form-component'>
                <label htmlFor="name">Nom du bouton : </label>
                <p className='form-texte'>Texte affiché sur le bouton</p>
                <textarea name="" id="" cols="80" rows="1" type="text" maxLength={20} placeholder=''></textarea>
            </div>
            <div className='form-component'>
                <label htmlFor="name">Lien du bouton : </label>
                <p className='form-texte'>Lien vers lequel le bouton redirige (Exemple : Itch.io)</p>
                <textarea name="" id="" cols="80" rows="1"></textarea>
            </div>
            
{/* CARROUSEL */}
            
            <div className='form-ligne'></div>
            <h2 className='form-titre-h2'>Carrousel</h2>
            <div className='form-component'>
                <label htmlFor="name">Image 1* : </label>
                <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                <input type="file" accept="image/png, image/jpeg" required='required'/>
            </div>
            <div className='form-component'>
                <label htmlFor="name">Image 2 : </label>
                <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                <input type="file" accept="image/png, image/jpeg"/>
            </div>
            <div className='form-component'>
                <label htmlFor="name">Image 3 : </label>
                <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                <input type="file" accept="image/png, image/jpeg"/>
            </div>
            <div className='form-component'>
                <label htmlFor="name">Image 4 : </label>
                <p className='form-texte'>Image au format 16:9 (Exemple : 1920x1080)</p>
                <input type="file" accept="image/png, image/jpeg"/>
            </div>
            <p className='form-texte'>* : Champ obligatoire</p>
            <div className='form-component'>
                <input className='send-form' type="submit" value="Envoyer le formulaire" />
            </div>            
        </form>
    </>
  )
}

export default AdministrationJeu