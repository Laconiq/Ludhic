import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  // nginx sert chaque page sous `/chemin/` et redirige `/chemin` en 301 :
  // on aligne le serveur de dev dessus, pour qu'un lien sans `/` final
  // casse en local plutôt que de coûter une redirection en prod.
  trailingSlash: 'always',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
