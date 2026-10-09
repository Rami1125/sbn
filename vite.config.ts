import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const staticHtmlServePlugin = () => ({
  name: 'static-html-serve',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const urlPath = req.url?.split('?')[0];
      if (urlPath === '/google4fccee9f84731cf5.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('google-site-verification: google4fccee9f84731cf5.html\n');
        return;
      }
      if (urlPath === '/returns' || urlPath === '/returns.html') {
        const filePath = path.resolve(__dirname, 'public/returns.html');
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
          return;
        }
      }
      if (urlPath === '/business' || urlPath === '/business.html' || urlPath === '/comax') {
        const filePath = path.resolve(__dirname, 'public/business.html');
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
          return;
        }
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), staticHtmlServePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
