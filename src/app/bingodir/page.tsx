'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bingoData from '@/data/bingoData.json';

interface BingoCell {
  text: string;
  isChecked: boolean;
  isCenter: boolean;
}

function shuffled<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildGrid(): BingoCell[][] {
  const selected = shuffled(bingoData.bingoEntries).slice(0, 24);
  const grid: BingoCell[][] = [];
  let index = 0;

  for (let row = 0; row < 5; row++) {
    grid[row] = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        grid[row][col] = { text: 'BOUTET', isChecked: true, isCenter: true };
      } else {
        grid[row][col] = { text: selected[index], isChecked: false, isCenter: false };
        index++;
      }
    }
  }

  return grid;
}

export default function BingoDir() {
  const [bingoGrid, setBingoGrid] = useState<BingoCell[][]>(buildGrid);

  const regenerate = useCallback(() => setBingoGrid(buildGrid()), []);

  const toggleCell = (row: number, col: number) => {
    if (bingoGrid[row][col].isCenter) return;

    setBingoGrid(prev =>
      prev.map((gridRow, r) =>
        gridRow.map((cell, c) =>
          r === row && c === col ? { ...cell, isChecked: !cell.isChecked } : cell
        )
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[200] bg-[var(--bg-primary)]/95 backdrop-blur-[20px] border-b border-[var(--border-primary)] py-2 lg:py-4">
        <div className="flex items-center justify-between px-3 lg:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10">
              <Image
                src="/images/logo.png"
                alt="Ludhic Logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span className="font-gaming text-lg lg:text-xl foil-effect">
              LUDHIC
            </span>
          </Link>

          <div className="flex items-center gap-4 lg:gap-8">
            {(['ACCUEIL', 'JEUX', 'FAQ'] as const).map((label) => {
              const id = label === 'ACCUEIL' ? 'hero' : label === 'JEUX' ? 'games' : 'faq';
              return (
                <Link
                  key={id}
                  href={`/#${id}`}
                  className="text-[var(--text-primary)]/85 hover:text-[var(--primary-blue)] hover:[text-shadow:0_0_20px_currentColor] font-gaming text-xs lg:text-sm tracking-wider transition-all duration-300 hover:scale-105"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-2 py-4 lg:px-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 lg:gap-4 mb-4 lg:mb-8">
          <h1 className="text-4xl lg:text-6xl font-gaming foil-effect">
            BINGODIR
          </h1>
          <p className="text-[var(--text-primary)]/70 text-sm lg:text-lg text-center">
            Le bingo officieux des soutenances Master HIC
          </p>
          <button
            onClick={regenerate}
            className="px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg cursor-pointer text-sm lg:text-base font-gaming tracking-wider border border-[var(--primary-blue)] bg-[var(--primary-blue)]/20 text-[var(--text-primary)] hover:bg-[var(--primary-blue)]/40 hover:shadow-[var(--shadow-glow)] active:scale-95 transition-all duration-300"
          >
            NOUVELLE GRILLE
          </button>
        </div>

        {/* Grille */}
        <div className="w-full max-w-[95vw] lg:max-w-2xl">
          <div className="flex flex-col gap-1 lg:gap-2">
            {bingoGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 lg:gap-2">
                {row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => toggleCell(rowIndex, colIndex)}
                    className={`
                      flex-1 aspect-square flex items-center justify-center p-1 lg:p-3
                      rounded-md lg:rounded-xl border transition-colors duration-200
                      ${cell.isCenter
                        ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400 text-yellow-100 cursor-default'
                        : cell.isChecked
                          ? 'bg-gradient-to-br from-green-500/30 to-cyan-500/30 border-green-400 text-green-100'
                          : 'bg-linear-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-[var(--primary-blue)] cursor-pointer active:scale-95'
                      }
                    `}
                  >
                    <span className="text-[0.55rem] leading-tight lg:text-xs lg:leading-snug text-center break-words hyphens-auto">
                      {cell.text}
                      {cell.isChecked && !cell.isCenter && (
                        <span className="ml-0.5 text-green-400">&#10003;</span>
                      )}
                      {cell.isCenter && (
                        <span className="ml-0.5 text-yellow-400">&#128081;</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="flex flex-col items-center gap-1 mt-4 lg:mt-8 text-[var(--text-primary)]/60 text-xs lg:text-sm text-center px-4">
          <p>Cliquez sur les cases quand l&apos;événement se produit pendant une soutenance</p>
          <p>Objectif : Compléter une ligne, colonne ou diagonale pour faire BINGO !</p>
        </div>
      </main>
    </div>
  );
}
