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
  }>;
}

export default function SEOSchema({ games = [] }: SEOSchemaProps) {
  const baseUrl = 'https://ludhic.fr';

  // Schema principal de l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Association Ludhic",
    "alternateName": "Ludhic",
    "description": "Association regroupant les étudiants et anciens étudiants du Master Humanités et Industries Créatives (HIC), spécialisée dans la création de jeux vidéo et contenus numériques.",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "image": `${baseUrl}/images/og-image.jpg`,
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "France"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "ludhic.association@gmail.com",
      "contactType": "Customer Service",
      "availableLanguage": "French"
    },
    "sameAs": [
      "https://ludhic.fr"
    ],
    "knowsAbout": [
      "Game Design",
      "Développement Jeux Vidéo", 
      "Humanités Numériques",
      "Industries Créatives",
      "Formation Universitaire"
    ]
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
      "audienceType": "Students, Game Developers, Educators"
    }
  };

  // Schema pour chaque jeu (créative work)
  const gamesSchemas = games.map(game => ({
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.longDescription,
    "url": `${baseUrl}/games/${game.id}`,
    "image": `${baseUrl}${game.contentFolder}/image1.jpg`,
    "dateCreated": `${game.year}`,
    "genre": game.genres,
    "creator": game.credits.map(member => ({
      "@type": "Person",
      "name": `${member.firstName} ${member.lastName}`,
      "jobTitle": member.roles[0] || "Contributeur"
    })),
    "publisher": {
      "@type": "Organization", 
      "name": "Association Ludhic"
    },
    "educationalUse": "Student Project",
    "audience": {
      "@type": "Audience",
      "audienceType": "Game Enthusiasts"
    },
    "inLanguage": "fr-FR"
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
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Jeux",
        "item": `${baseUrl}#games`
      }
    ]
  };

  const allSchemas = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    ...gamesSchemas
  ];

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