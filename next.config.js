/** @type {import('next').NextConfig} */
const { withEffectorReactAliases } = require("effector-next/tools");
const enhance = withEffectorReactAliases();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.api-sports.io"],
  },
};

module.exports = enhance(nextConfig);
