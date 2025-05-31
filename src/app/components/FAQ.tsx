'use client';

import { useState } from 'react';

const faqData = [
  {
    question: "Qu'est-ce que le Master HIC ?",
    answer: "Le Master Humanités et Industries Créatives (HIC) forme à la création, la production et la commercialisation de contenus créatifs pour de nouveaux usages numériques."
  },
  {
    question: "Qui peut rejoindre l'association Ludhic ?",
    answer: "Tous les étudiants et anciens étudiants du Master HIC (anciennement MAJE) peuvent rejoindre l'association en contactant les membres du bureau à l'adresse email suivante : ludhic.association@gmail.com."
  },
  {
    question: "Comment ajouter ou modifier un jeu présent sur le site ?",
    answer: "Pour ajouter ou modifier un jeu, il suffit de contacter par email, ludhic.association@gmail.com, ou par Discord un des membres du bureau de l'association. Après cela, elle vous mettra en lien avec une personne s'occupant de l'administration du site."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-gaming foil-effect mb-4">
            FAQ
          </h2>
          <p className="text-white/70 text-lg">
            Questions fréquentes sur le Master HIC et nos projets
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="card-gaming rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-300 cursor-pointer"
              >
                <h3 className="text-lg md:text-xl font-gaming text-white pr-4">
                  {item.question}
                </h3>
                <div className={`transform transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <svg 
                    className="w-6 h-6 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-4"></div>
                  <p className="text-white/80 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gaming accent elements */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 text-cyan-400/60">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400/60"></div>
            <span className="font-gaming text-sm tracking-wider">LUDHIC JEUX ÉTUDIANTS</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 