module.exports = {
  images: {
    domains: ['cdninstagram.com','cdn.shopify.com'],
  },
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
