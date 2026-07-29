interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Fondu à l'apparition, piloté par le scroll en CSS pur (`animation-timeline: view()`).
 * Aucun JS : le contenu est présent dans le HTML pré-rendu, et les navigateurs
 * sans timeline de scroll l'affichent simplement sans animation.
 */
export default function FadeInView({ children, className }: FadeInViewProps) {
  return <div className={className ? `fade-in-view ${className}` : 'fade-in-view'}>{children}</div>;
}
