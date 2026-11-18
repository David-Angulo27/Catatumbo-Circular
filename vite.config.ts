import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Rutas relativas: el sitio funciona en la raíz de un dominio o en una subcarpeta
  // (por ejemplo, GitHub Pages: https://usuario.github.io/nombre-del-repositorio/).
  base: './',
  plugins: [react(), tailwindcss()],
});
