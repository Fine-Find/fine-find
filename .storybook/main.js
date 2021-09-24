
const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  core: {
    builder: 'webpack5',
  },
  "addons": [
    "@storybook/addon-links",
    '@storybook/addon-knobs',
    "@storybook/addon-essentials",
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
           modules: true,
        }
      }
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      include: path.resolve(__dirname, '../src/'),
    });

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../"),
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/config': path.resolve(__dirname, '../public'),
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@/types': path.resolve(__dirname, '../src/types'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
    }
/*
    "paths": {
      "@/components/*": ["components/*"],
      "@/config/*": ["config/*"],
      "@/hooks/*": ["hooks/*"],
      "@/utils/*": ["utils/*"],
      "@/types/*": ["types/*"],
      "@/styles/*": ["styles/*"]
    }
*/

    // Return the altered config
    return config;
  },
};