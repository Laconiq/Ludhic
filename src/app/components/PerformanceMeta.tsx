export default function PerformanceMeta() {
  return (
    <>
      {/* Preload des ressources critiques */}
      <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
      
      {/* DNS prefetch pour les domaines externes */}
      <link rel="dns-prefetch" href="//univ-cotedazur.fr" />
      <link rel="dns-prefetch" href="//vercel.com" />
      
      {/* Preconnect pour les domaines critiques */}
      <link rel="preconnect" href="https://univ-cotedazur.fr" />
      
      {/* Meta tags pour les performances */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Optimisations pour les performances */}
      <meta name="theme-color" content="#111827" />
      <meta name="color-scheme" content="dark" />
    </>
  );
} 