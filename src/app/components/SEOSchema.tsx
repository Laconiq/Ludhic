'use client';

interface SEOSchemaProps {
  games?: Array<{
    id: number;
    title: string;
    longDescription: string;
    year: number;
    genres: string[];
    contentFolder: string;
    credits: Array<{
      firstName: string;
      lastName: string;
      roles: string[];
    }>;
    featured?: boolean;
    customButton?: {
      enabled: boolean;
      name: string;
      link: string;
    };
  }>;
  currentPage?: string;
  currentGame?: {
    title: string;
    id: number;
  };
}

export default function SEOSchema({ games = [], currentPage = 'home', currentGame }: SEOSchemaProps) {
  const baseUrl = 'https://ludhic.fr';

  // Fonction pour créer un slug à partir du titre
  function createSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Schema principal de l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Association Ludhic",
    "alternateName": "Ludhic",
    "description": "Association regroupant les étudiants et anciens étudiants du Master Humanités et Industries Créatives (HIC), spécialisée dans la création de jeux vidéo et contenus numériques.",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "image": `${baseUrl}/images/logo.png`,
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "France",
      "addressRegion": "Provence-Alpes-Côte d'Azur"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "ludhic.association@gmail.com",
      "contactType": "Customer Service",
      "availableLanguage": "French"
    },
    "sameAs": [
      "https://ludhic.fr",
      "https://univ-cotedazur.fr/formation/offre-de-formation/majic-master-jeux-video-image-et-creativite"
    ],
    "knowsAbout": [
      "Game Design",
      "Développement Jeux Vidéo", 
      "Humanités Numériques",
      "Industries Créatives",
      "Formation Universitaire",
      "Création Interactive",
      "Narrative Design",
      "Level Design",
      "Sound Design",
      "3D Modeling",
      "2D Art"
    ],
    "educationalLevel": "Master",
    "educationalProgramMode": "Full-time",
    "inLanguage": "fr-FR"
  };

  // Schema du site web
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ludhic - Portfolio Jeux Étudiants Master HIC",
    "url": baseUrl,
    "description": "Portfolio interactif présentant les créations de jeux vidéo des étudiants du Master Humanités et Industries Créatives",
    "publisher": {
      "@type": "Organization",
      "name": "Association Ludhic"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "fr-FR",
    "copyrightYear": new Date().getFullYear(),
    "audience": {
      "@type": "Audience",
      "audienceType": "Students, Game Developers, Educators, Game Enthusiasts"
    },
    "genre": ["Portfolio", "Educational", "Gaming"],
    "keywords": "jeux vidéo, étudiants, Master HIC, portfolio, association, création numérique"
  };

  // Schema pour chaque jeu (créative work)
  const gamesSchemas = games.map(game => ({
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.longDescription,
    "url": `${baseUrl}/games/${createSlug(game.title)}`,
    "image": `${baseUrl}${game.contentFolder}/1.webp`,
    "dateCreated": `${game.year}`,
    "genre": game.genres,
    "creator": game.credits.map(member => ({
      "@type": "Person",
      "name": `${member.firstName} ${member.lastName}`,
      "jobTitle": member.roles[0] || "Contributeur",
      "knowsAbout": member.roles
    })),
    "publisher": {
      "@type": "Organization", 
      "name": "Association Ludhic"
    },
    "educationalUse": "Student Project",
    "audience": {
      "@type": "Audience",
      "audienceType": "Game Enthusiasts, Students, Educators"
    },
    "inLanguage": "fr-FR",
    "gamePlatform": ["PC", "Web"],
    "applicationCategory": "Game",
    "operatingSystem": "Windows, macOS, Linux",
    "offers": game.customButton?.enabled ? {
      "@type": "Offer",
      "url": game.customButton.link,
      "name": game.customButton.name,
      "availability": "https://schema.org/InStock"
    } : undefined,
    "isPartOf": {
      "@type": "CreativeWorkSeries",
      "name": "Portfolio Ludhic",
      "description": "Collection de jeux étudiants du Master HIC"
    }
  }));

  // Schema breadcrumb pour la navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": baseUrl
      },
      ...(currentPage === 'game' && currentGame ? [
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Jeux",
          "item": `${baseUrl}#games`
        },
        {
          "@type": "ListItem", 
          "position": 3,
          "name": currentGame.title,
          "item": `${baseUrl}/games/${createSlug(currentGame.title)}`
        }
      ] : [
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Jeux",
          "item": `${baseUrl}#games`
        }
      ])
    ]
  };

  // Schema FAQ pour la page d'accueil
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que Ludhic ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ludhic est une association regroupant les étudiants et anciens étudiants du Master Humanités et Industries Créatives (HIC), spécialisée dans la création de jeux vidéo et contenus numériques."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de jeux sont présentés ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le portfolio présente une variété de jeux créés par les étudiants : jeux d'action, d'aventure, narratifs, VR, plateformes, et bien d'autres genres."
        }
      },
      {
        "@type": "Question",
        "name": "Comment accéder aux jeux ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous pouvez explorer les jeux directement sur le site, voir les captures d'écran, et pour certains jeux, les télécharger via les liens fournis."
        }
      }
    ]
  };

  // Schema Collection pour l'ensemble des jeux
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    "name": "Portfolio Ludhic - Jeux Étudiants",
    "description": "Collection de jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives",
    "url": `${baseUrl}#games`,
    "publisher": {
      "@type": "Organization",
      "name": "Association Ludhic"
    },
    "hasPart": games.map(game => ({
      "@type": "VideoGame",
      "name": game.title,
      "url": `${baseUrl}/games/${createSlug(game.title)}`
    })),
    "inLanguage": "fr-FR",
    "audience": {
      "@type": "Audience",
      "audienceType": "Game Enthusiasts, Students, Educators"
    }
  };

  const allSchemas: Record<string, unknown>[] = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    collectionSchema,
    ...gamesSchemas
  ];

  // Ajouter le FAQ schema seulement sur la page d'accueil
  if (currentPage === 'home') {
    allSchemas.push(faqSchema);
  }

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  );
} 