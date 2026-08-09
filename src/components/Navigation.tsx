import { useState, useEffect, useRef } from 'preact/hooks';

const NAV_HEIGHT = 120;

const MENU_ITEMS = [
  { label: 'ACCUEIL', id: 'hero' },
  { label: 'JEUX', id: 'games' },
  { label: 'FAQ', id: 'faq' },
] as const;

const SECTION_IDS = MENU_ITEMS.toReversed().map((item) => item.id);

const navItemClass = (isActive: boolean) =>
  isActive
    ? 'text-[var(--primary-blue)] [text-shadow:0_0_20px_currentColor]'
    : 'text-[var(--text-primary)]/85 hover:text-[var(--primary-blue)] hover:[text-shadow:0_0_20px_currentColor]';

function scrollToSection(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;
  element.scrollIntoView({ behavior: 'smooth' });
  return true;
}

interface NavigationProps {
  logoSrc: string;
}

export default function Navigation({ logoSrc }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const activeSectionRef = useRef('');
  const isScrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 10;
          if (isScrolledRef.current !== scrolled) {
            isScrolledRef.current = scrolled;
            setIsScrolled(scrolled);
          }
          for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= NAV_HEIGHT && rect.bottom > NAV_HEIGHT) {
                if (activeSectionRef.current !== id) {
                  activeSectionRef.current = id;
                  setActiveSection(id);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    // Depuis une page jeu, la section n'existe pas : on rejoint l'ancre de
    // l'accueil par une navigation complète plutôt que par le routeur client
    // de Next (qui n'existe plus ici).
    if (!scrollToSection(sectionId)) {
      window.location.href = `/#${sectionId}`;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav class={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 bg-[var(--bg-primary)]/95 backdrop-blur-[20px] border-b border-[var(--border-primary)] ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-200">
            <div class="relative w-10 h-10">
              <img src={logoSrc} alt="Ludhic Logo" width={40} height={40} class="w-full h-full object-contain" />
            </div>
            <span class="font-gaming text-xl foil-effect">
              LUDHIC
            </span>
          </a>

          <div class="hidden md:flex items-center space-x-8">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                class={`font-gaming text-sm tracking-wider transition-all duration-300 relative group cursor-pointer hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:rounded ${navItemClass(activeSection === item.id)}`}
              >
                {item.label}
                <span class={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            class="md:hidden text-[var(--text-primary)] p-2 rounded-lg border border-[var(--border-primary)] hover:border-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/10 hover:scale-105 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div class="md:hidden mt-4 pb-4 border-t border-[var(--border-primary)] relative z-[150]">
            <div class="flex flex-col space-y-4 pt-4">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  class={`font-gaming text-sm tracking-wider transition-all duration-300 text-left py-2 px-4 rounded-lg cursor-pointer hover:bg-[var(--primary-blue)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    activeSection === item.id ? `${navItemClass(true)} bg-[var(--primary-blue)]/10` : navItemClass(false)
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
