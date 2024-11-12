// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: './postcss.config.js',
//   },
//   // server: {
//   //   host: 'myapp.local', // Custom domain
//   //   port: 3000,          // Custom port
//   // },
//   server: {
//     host: 'localhost', // Custom domain
//     port: 3000,          // Custom port
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // Here
    strictPort: true,
    port: 8080,
  },
});