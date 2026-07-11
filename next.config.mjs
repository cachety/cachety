/** @type {import('next').NextConfig} */
const nextConfig = {
  // App 100% client : export statique, aucun serveur à déployer.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
