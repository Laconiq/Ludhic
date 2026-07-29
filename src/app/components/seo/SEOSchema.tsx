'use client';

import { createSlug } from '@/lib/slug';
import { SITE_URL } from '@/constants/site';
import { createBreadcrumbSchema } from '@/lib/schemas';
import type { JsonLdSchema } from '@/types/game';

interface SEOSchemaProps {
  games?: Array<{ title: string }>;
}

export default function SEOSchema({ games = [] }: SEOSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Association Ludhic",
    "alternateName": "Ludhic",
    "description": "Association regroupant les étudiants et anciens étudiants du Master Humanités et Industries Créatives (HIC), spécialisée dans la création de jeux vidéo et contenus numériques.",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/logo.png`,
    "image": `${SITE_URL}/images/logo.png`,
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ludhic - Portfolio Jeux Étudiants Master HIC",
    "url": SITE_URL,
    "description": "Portfolio interactif présentant les créations de jeux vidéo des étudiants du Master Humanités et Industries Créatives",
    "publisher": {
      "@type": "Organization",
      "name": "Association Ludhic"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/?search={search_term_string}`
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Portfolio Ludhic - Jeux Étudiants",
    "description": "Collection de jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives",
    "numberOfItems": games.length,
    "itemListElement": games.map((game, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": game.title,
      "url": `${SITE_URL}/games/${createSlug(game.title)}`
    }))
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Jeux", url: `${SITE_URL}#games` }
  ]);

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

  const allSchemas: JsonLdSchema[] = [
    organizationSchema,
    websiteSchema,
    itemListSchema,
    breadcrumbSchema,
    faqSchema
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
