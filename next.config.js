/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iili.io",
        port: "",
      },
    ],
  },
};

https: module.exports = nextConfig;
