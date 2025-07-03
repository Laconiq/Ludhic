'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import bingoData from '../../data/bingoData.json';

interface BingoCell {
  text: string;
  isChecked: boolean;
  isCenter: boolean;
}

export default function BingoDir() {
  const [bingoGrid, setBingoGrid] = useState<BingoCell[][]>([]);

  // Générer une grille aléatoire
  const generateGrid = useCallback(() => {
    const shuffled = [...bingoData.bingoEntries].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 24); // 24 entrées pour les cases non-centrales
    
    const grid: BingoCell[][] = [];
    let index = 0;
    
    for (let row = 0; row < 5; row++) {
      grid[row] = [];
      for (let col = 0; col < 5; col++) {
        if (row === 2 && col === 2) {
          // Case centrale toujours BOUTET
          grid[row][col] = {
            text: 'BOUTET',
            isChecked: true, // Toujours cochée
            isCenter: true
          };
        } else {
          grid[row][col] = {
            text: selected[index],
            isChecked: false,
            isCenter: false
          };
          index++;
        }
      }
    }
    
    setBingoGrid(grid);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  // Basculer l'état d'une case
  const toggleCell = (row: number, col: number) => {
    if (bingoGrid[row][col].isCenter) return; // Ne pas permettre de décocher BOUTET
    
    const newGrid = bingoGrid.map((gridRow, rowIndex) =>
      gridRow.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, isChecked: !cell.isChecked };
        }
        return cell;
      })
    );
    
    setBingoGrid(newGrid);
  };

  const scrollToSection = (sectionId: string) => {
    // Si on est sur bingodir, rediriger vers la page principale
    window.location.href = `/#${sectionId}`;
  };

  return (
    <>
      {/* Navigation customisée pour bingodir */}
      <nav className="fixed top-0 left-0 right-0 z-[200] transition-all duration-300 nav-gaming py-2 md:py-4">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/images/logo.png"
                  alt="Ludhic Logo"
                  className="object-contain w-full h-full"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-gaming text-lg md:text-xl foil-effect">
                LUDHIC
              </span>
            </div>

            {/* Menu items */}
            <div className="flex items-center space-x-3 md:space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white/80 hover:text-neon font-gaming text-xs md:text-sm tracking-wider transition-all duration-300 hover:text-glow relative group cursor-pointer hover:scale-105"
              >
                ACCUEIL
              </button>
              <button
                onClick={() => scrollToSection('games')}
                className="text-white/80 hover:text-neon font-gaming text-xs md:text-sm tracking-wider transition-all duration-300 hover:text-glow relative group cursor-pointer hover:scale-105"
              >
                JEUX
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-white/80 hover:text-neon font-gaming text-xs md:text-sm tracking-wider transition-all duration-300 hover:text-glow relative group cursor-pointer hover:scale-105"
              >
                FAQ
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="min-h-screen bg-gray-900 py-4 md:py-8 px-2 md:px-4 pt-16 md:pt-20">
        <div className="max-w-2xl md:max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-gaming foil-effect mb-2 md:mb-4">
              BINGODIR
            </h1>
            <p className="text-white/70 text-sm md:text-lg mb-3 md:mb-4 px-4">
              Le bingo officieux des soutenances Master HIC
            </p>
            <button
              onClick={generateGrid}
              className="btn-gaming px-4 md:px-6 py-2 md:py-3 rounded-lg cursor-pointer text-sm md:text-base"
            >
              🎲 NOUVELLE GRILLE
            </button>
          </div>

          {/* Grille de bingo */}
          <div className="grid grid-cols-5 gap-1 md:gap-2 mb-4 md:mb-8 max-w-sm md:max-w-3xl mx-auto">
            {bingoGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                  className={`
                    aspect-square p-1 md:p-2 rounded-lg md:rounded-xl border-2 transition-all duration-300 text-xs md:text-xs font-gaming leading-tight
                    ${cell.isCenter 
                      ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400 text-yellow-100 cursor-default' 
                      : cell.isChecked
                        ? 'bg-gradient-to-br from-green-500/30 to-cyan-500/30 border-green-400 text-green-100'
                        : 'card-gaming border-gray-600 text-white/80 hover:border-cyan-400 cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-center justify-center h-full text-center">
                    <span className="text-xs md:text-xs leading-none">
                      {cell.text}
                      {cell.isChecked && !cell.isCenter && (
                        <span className="ml-1 text-green-400">✓</span>
                      )}
                      {cell.isCenter && (
                        <span className="ml-1 text-yellow-400">👑</span>
                      )}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-white/60 text-xs md:text-sm px-4">
            <p className="mb-2">Cliquez sur les cases quand l&apos;événement se produit pendant une soutenance</p>
            <p>Objectif : Compléter une ligne, colonne ou diagonale pour faire BINGO !</p>
          </div>
        </div>
      </div>
    </>
  );
} 