/** O app é servido em seudominio.com/app (o quiz fica na raiz). */
const nextConfig = {
  output: 'export',
  basePath: '/app',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
