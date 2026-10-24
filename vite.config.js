import react from '@vitejs/plugin-react';

// No dev, /ww-up1/ (pasta em public/) não serve o index.html sozinho; em produção o host já faz isso.
const folderIndex = {
  name: 'folder-index',
  configureServer(server) {
    server.middlewares.use((req, _, next) => {
      if (req.url.length > 1 && req.url.endsWith('/')) req.url += 'index.html';
      next();
    });
  },
};

export default {
  plugins: [react(), folderIndex],
  build: { assetsDir: 'bundle' }, // 'assets' já é a pasta de imagens em public/
  test: { environment: 'jsdom', globals: true, setupFiles: ['src/__tests__/setup.js'] },
};
