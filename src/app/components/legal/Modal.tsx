'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  closeLabel: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, titleId, title, closeLabel, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const prevIsOpenRef = useRef(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'Tab' && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      triggerRef.current = document.activeElement as HTMLElement | null;
    }
    if (!isOpen && prevIsOpenRef.current) {
      triggerRef.current?.focus();
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const modal = modalRef.current;

    const blockScroll = (e: WheelEvent | TouchEvent) => {
      if (modal && modal.contains(e.target as Node)) return;
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    overlay?.addEventListener('wheel', blockScroll, { passive: false });
    overlay?.addEventListener('touchmove', blockScroll, { passive: false });
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      overlay?.removeEventListener('wheel', blockScroll);
      overlay?.removeEventListener('touchmove', blockScroll);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-gaming text-cyan-400">
            <span id={titleId}>{title}</span>
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={closeLabel}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
          <div className="prose prose-invert prose-cyan max-w-none text-white/80 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
