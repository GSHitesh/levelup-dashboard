/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "levelup-dashboard";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true,
};

export default nextConfig;
