/**
 * Scroll vers une section de la page par son ID.
 *
 * Retourne `false` si la section est absente de la page courante. C'est au
 * caller de décider quoi faire — naviguer, ignorer — parce que la navigation
 * relève du routeur Next et non d'un utilitaire DOM : y appeler
 * `window.location.href` provoquerait un rechargement complet, et donc le
 * retéléchargement de la vidéo de fond, des images et des polices.
 */
export function scrollToSection(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  element.scrollIntoView({ behavior: 'smooth' });
  return true;
}
