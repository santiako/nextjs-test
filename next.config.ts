import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config();

const nextConfig: NextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
