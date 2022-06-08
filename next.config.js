/** @type {import('next').NextConfig} */
const { withEffectorReactAliases } = require("effector-next/tools");
const enhance = withEffectorReactAliases();

const nextConfig = {
  reactStrictMode: true,
};

module.exports = enhance(nextConfig);
