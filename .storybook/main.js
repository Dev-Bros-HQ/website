module.exports = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        {
          loader: "postcss-loader",
          options: { implementation: require.resolve("postcss") },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });
    // Return the altered config
    return config;
  },
};
