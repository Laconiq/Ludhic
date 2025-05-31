import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ludhic - Association Jeux Étudiants Master HIC",
    template: "%s | Ludhic - Master HIC"
  },
  description: "🎮 Découvrez les projets de jeux vidéo créés par les étudiants du Master Humanités et Industries Créatives (HIC). Portfolio interactif, association étudiante, créations originales. Anciennement MAJIC.",
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
    "formation jeux vidéo"
  ],
  authors: [{ name: "Association Ludhic" }],
  creator: "Association Ludhic",
  publisher: "Association Ludhic",
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
    title: 'Ludhic - Portfolio Jeux Étudiants Master HIC',
    description: '🎮 Découvrez les créations de jeux vidéo des étudiants du Master Humanités et Industries Créatives. Portfolio interactif et association étudiante.',
    images: [
      {
        url: 'https://ludhic.fr/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ludhic - Portfolio jeux étudiants Master HIC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ludhic - Portfolio Jeux Étudiants Master HIC',
    description: '🎮 Découvrez les créations de jeux vidéo des étudiants du Master HIC. Portfolio interactif et association étudiante.',
    images: ['https://ludhic.fr/images/og-image.jpg'],
    creator: '@LudhicFr',
  },
  verification: {
    google: 'VOTRE_CODE_GOOGLE_SEARCH_CONSOLE',
    // bing: 'VOTRE_CODE_BING',
  },
  alternates: {
    canonical: 'https://ludhic.fr',
  },
  category: 'Education',
  icons: {
    icon: [
      { url: "/images/logo.png" },
      { url: "/images/logo-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/images/logo.png",
    apple: [
      { url: "/images/logo-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
