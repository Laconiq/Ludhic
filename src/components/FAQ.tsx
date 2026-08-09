import { useState } from 'preact/hooks';

const faqData = [
  {
    question: "Qu'est-ce que le Master HIC ?",
    answer: "Le Master Humanités et Industries Créatives (HIC) forme à la création, la production et la commercialisation de contenus créatifs pour de nouveaux usages numériques.",
  },
  {
    question: "Qui peut rejoindre l'association Ludhic ?",
    answer: "Tous les étudiants et anciens étudiants du Master HIC (anciennement MAJE) peuvent rejoindre l'association en contactant les membres du bureau à l'adresse email suivante : ludhic.association@gmail.com.",
  },
  {
    question: 'Comment ajouter ou modifier un jeu présent sur le site ?',
    answer: "Pour ajouter ou modifier un jeu, il suffit de contacter par email, ludhic.association@gmail.com, ou par Discord un des membres du bureau de l'association. Après cela, elle vous mettra en lien avec une personne s'occupant de l'administration du site.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" class="py-20 px-4 bg-[var(--bg-primary)]">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-gaming foil-effect mb-4">
            FAQ
          </h2>
          <p class="text-white/85 text-lg">
            Questions fréquentes sur le Master HIC et nos projets
          </p>
        </div>

        <div class="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} class="fade-in-view">
              <div class="gaming-card overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-label={`${openIndex === index ? 'Fermer' : 'Ouvrir'} la question : ${item.question}`}
                  aria-expanded={openIndex === index}
                  class="w-full text-left p-6 flex justify-between items-center hover:bg-[var(--bg-tertiary)]/50 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                >
                  <h3 class="text-lg md:text-xl font-gaming text-white pr-4">
                    {item.question}
                  </h3>
                  <div class={`transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg class="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div class={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div class="px-6 pb-6">
                    <div class="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-4"></div>
                    <p class="text-white/90 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div class="text-center mt-16">
          <div class="inline-flex items-center gap-4 text-cyan-400">
            <div class="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
            <span class="font-gaming text-sm tracking-wider">LUDHIC JEUX ÉTUDIANTS</span>
            <div class="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
