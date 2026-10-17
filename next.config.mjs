/** @type {import('next').NextConfig} */
const nextConfig = {
  // App 100% client : export statique, aucun serveur à déployer.
  output: "export",
  images: { unoptimized: true },
  // `next dev` ne sert ses scripts qu'à localhost. Pour ouvrir le serveur de
  // dev depuis une autre machine : DEV_ORIGINS=192.168.1.20 bun run dev.
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(",").filter(Boolean) ?? [],
};

export default nextConfig;
