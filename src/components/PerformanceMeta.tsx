export default function PerformanceMeta() {
  return (
    <>
      {/* Preloads critiques pour les performances */}
      <link rel="preload" href="/fonts/PixelifySans-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/PixelifySans-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/PlusJakartaSans-VariableFont_wght.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      
      {/* Preload des images critiques */}
      <link rel="preload" href="/images/logo.png" as="image" />
      
      {/* Preload des vidéos d'arrière-plan */}
      <link rel="preload" href="/videos/background-1.webm" as="video" type="video/webm" />
      <link rel="preload" href="/videos/background-2.webm" as="video" type="video/webm" />
      <link rel="preload" href="/videos/background-3.webm" as="video" type="video/webm" />
      
      {/* DNS prefetch pour les domaines externes */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//univ-cotedazur.fr" />
      
      {/* Preconnect pour les connexions critiques */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://univ-cotedazur.fr" />
      
      {/* Meta tags pour les performances */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Optimisations pour les Core Web Vitals */}
      <meta name="theme-color" content="#06b6d4" />
      <meta name="color-scheme" content="dark" />
      
      {/* Optimisations pour les PWA */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Ludhic" />
      <meta name="application-name" content="Ludhic" />
      <meta name="msapplication-TileColor" content="#06b6d4" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Optimisations pour les réseaux sociaux */}
      <meta property="og:site_name" content="Ludhic - Association Master HIC" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content="website" />
      
      {/* Optimisations pour Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@LudhicFr" />
      <meta name="twitter:creator" content="@LudhicFr" />
      
      {/* Optimisations pour les moteurs de recherche */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Optimisations pour l'accessibilité */}
      <meta name="accessibility-control" content="full" />
      <meta name="accessibility-feature" content="high-contrast, large-text, reduced-motion" />
      
      {/* Optimisations pour la sécurité */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Optimisations pour les performances de chargement */}
      <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
      <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      
      {/* Optimisations pour les polices */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Pixelify Sans';
            src: url('/fonts/PixelifySans-Regular.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Pixelify Sans';
            src: url('/fonts/PixelifySans-Bold.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Plus Jakarta Sans';
            src: url('/fonts/PlusJakartaSans-VariableFont_wght.ttf') format('truetype-variations');
            font-weight: 100 900;
            font-style: normal;
            font-display: swap;
          }
        `
      }} />
    </>
  );
} 