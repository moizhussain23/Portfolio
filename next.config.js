const path = require('path')

// Detect if we are building for GitHub Pages Project site
// Set NEXT_PUBLIC_BASE_PATH to "/REPO_NAME" in the workflow for project pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

module.exports = {
  // Export static HTML for GitHub Pages
  output: 'export',
  // Ensure nested routes work when refreshing on static hosting
  trailingSlash: true,
  // Support project pages path prefix when provided
  ...(basePath
    ? { basePath, assetPrefix: `${basePath}/` }
    : {}),
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    // GitHub Pages does not support Next Image optimization
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
}