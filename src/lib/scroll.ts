/**
 * Scroll vers une section de la page par son ID.
 * Si l'élément n'existe pas et fallbackNavigate est true, redirige vers /#sectionId.
 */
export function scrollToSection(sectionId: string, fallbackNavigate = false): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else if (fallbackNavigate) {
    window.location.href = `/#${sectionId}`;
  }
}
