import { existsSync } from 'node:fs';
import react from '@vitejs/plugin-react';

// No dev, /ww-up1 ou /ww-up1/?utm=... (pasta em public/) não serve o index.html sozinho; em produção o host já faz isso.
const folderIndex = {
  name: 'folder-index',
  configureServer(server) {
    server.middlewares.use((req, _, next) => {
      const [path, query = ''] = req.url.split('?');
      const dir = path.replace(/\/$/, '');
      if (dir && existsSync(`public${dir}/index.html`)) req.url = `${dir}/index.html${query && '?' + query}`;
      next();
    });
  },
};

export default {
  plugins: [react(), folderIndex],
  build: { assetsDir: 'bundle' }, // 'assets' já é a pasta de imagens em public/
  test: { environment: 'jsdom', globals: true, setupFiles: ['src/__tests__/setup.js'] },
};
