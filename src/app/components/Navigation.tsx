'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  isModalOpen: boolean;
}

export default function Navigation({ isModalOpen }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: 'ACCUEIL', id: 'hero' },
    { label: 'JEUX', id: 'games' },
    { label: 'FAQ', id: 'faq' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 nav-gaming ${
      isScrolled ? 'py-2' : 'py-4'
    } ${isModalOpen ? 'transform -translate-y-full pointer-events-none' : 'transform translate-y-0'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-200">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="Ludhic Logo"
                fill
                className="object-contain"
                priority
                quality={90}
                sizes="40px"
              />
            </div>
            <span className="font-gaming text-xl foil-effect">
              LUDHIC
            </span>
          </Link>

          {/* Menu items - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-neon font-gaming text-sm tracking-wider transition-all duration-300 hover:text-glow relative group cursor-pointer hover:scale-105"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 rounded-lg border border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-600 relative z-[150]">
            <div className="flex flex-col space-y-4 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white/80 hover:text-neon font-gaming text-sm tracking-wider transition-all duration-300 hover:text-glow text-left py-2 px-4 rounded-lg hover:bg-cyan-400/10 cursor-pointer"
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