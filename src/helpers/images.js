import FileResizer from 'react-image-file-resizer';

/**
 * Cette fonction permet de compresser une image.
 * @param {File}    image   L'image à compresser.
 * @param {Number}  largeurMax  Largeur maximum après compression.
 * @param {Number}  hauteurMax  Hauteur maximum après compression.
 * @param {String}  format  Le format d'image qui résulterat. Peut être "PNG" ou "JPEG".
 * @param {Number}  qualite Le taux de qualité finale appliqué aux JPEG. Entre 0 (plus basse) et 100 (plus haute).
 * @returns {File} Le fichier image modifié.
 */
export function compresserImage(image, largeurMax, hauteurMax, format = "PNG", qualite = 100) 
{
    return new Promise((resolve) => {
        FileResizer.imageFileResizer(
            image,
            largeurMax,
            hauteurMax,
            format,
            qualite,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        )
    });
}

//TODO Rajouter paramètres maxWidth et maxHeight
        