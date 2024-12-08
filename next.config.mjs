/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Disable linting during the build process
      ignoreDuringBuilds: true,
    },
    typescript: {
      // Disable type-checking during the build process
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;
  