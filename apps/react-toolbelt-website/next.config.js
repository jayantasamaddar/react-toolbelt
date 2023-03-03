/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true
  },
  images: {
    domains: [
      'fonts.googleapis.com',
      'fonts.cdnfonts.com',
      'via.placeholder.com',
      'ik.imagekit.io'
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/installation',
        permanent: false
      }
    ];
  }

  // modularizeImports: {
  //   'react-icons/gi': {
  //     transform: 'react-icons/gi/{{member}}'
  //   },
  //   'react-icons/fa': {
  //     transform: 'react-icons/fa/{{member}}'
  //   }
  // }
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
