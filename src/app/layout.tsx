import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL } from "@/constants/site";

const plusJakartaSans = localFont({
  src: "../../public/fonts/PlusJakartaSans-VariableFont_wght.woff2",
  variable: "--font-body",
  display: "optional",
  weight: "200 800",
  preload: true,
});

const pixelifySans = localFont({
  src: [
    {
      path: "../../public/fonts/PixelifySans-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/PixelifySans-SemiBold.woff2",
      weight: "600",
    },
  ],
  variable: "--font-pixel",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ludhic - Portfolio Jeux Étudiants Master HIC | Association Jeux Vidéo",
    template: "%s | Ludhic - Master HIC"
  },
  description: "Découvrez les projets de jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives (HIC). Portfolio interactif, association étudiante, créations originales. Anciennement MAJIC. Explorez des jeux uniques et innovants.",
  keywords: [
    "Master HIC",
    "jeux vidéo étudiants",
    "Humanités Industries Créatives",
    "association étudiante",
    "portfolio jeux",
    "game design",
    "création numérique",
    "MAJIC",
    "Ludhic",
    "projets étudiants",
    "développement jeux",
    "université",
    "formation jeux vidéo",
    "jeux indépendants",
    "création interactive",
    "métiers du jeu vidéo",
    "études jeux vidéo",
    "côte d'azur",
    "université côte d'azur"
  ],
  authors: [{ name: "Association Ludhic", url: "https://ludhic.fr" }],
  creator: "Association Ludhic",
  publisher: "Association Ludhic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://ludhic.fr',
    siteName: 'Ludhic - Association Master HIC',
    title: 'Ludhic - Portfolio Jeux Étudiants Master HIC | Association Jeux Vidéo',
    description: 'Découvrez les créations de jeux vidéo des étudiants du Master Humanités et Industries Créatives. Portfolio interactif et association étudiante. Explorez des jeux uniques et innovants.',
    images: [
      {
        url: 'https://ludhic.fr/images/logo.png',
        width: 512,
        height: 512,
        alt: 'Ludhic - Portfolio jeux étudiants Master HIC - Association jeux vidéo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ludhic - Portfolio Jeux Étudiants Master HIC | Association Jeux Vidéo',
    description: 'Découvrez les créations de jeux vidéo des étudiants du Master HIC. Portfolio interactif et association étudiante. Explorez des jeux uniques et innovants.',
    images: ['https://ludhic.fr/images/logo.png'],
    creator: '@LudhicFr',
    site: '@LudhicFr',
  },
  alternates: {
    canonical: 'https://ludhic.fr',
    languages: {
      'fr-FR': 'https://ludhic.fr',
    },
  },
  category: 'Education',
  classification: 'Portfolio',
  other: {
    'theme-color': '#06b6d4',
    'color-scheme': 'dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Ludhic',
    'application-name': 'Ludhic',
    'msapplication-TileColor': '#06b6d4',
    'msapplication-config': '/browserconfig.xml',
  },
  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "any" },
      { url: "/images/logo-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/logo.png",
    apple: [
      { url: "/images/logo-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/images/logo-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/images/logo-120x120.png", sizes: "120x120", type: "image/png" },
    ],
    other: [],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="dns-prefetch" href="https://ludhic.fr" />
      </head>
      <body className={`${plusJakartaSans.variable} ${pixelifySans.variable} bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
