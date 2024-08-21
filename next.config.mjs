/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_MODEL_AI_URL: process.env.MODEL_AI_URL,
  },
};

export default nextConfig;
