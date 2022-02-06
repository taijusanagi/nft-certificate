const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-sass-postcss"],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
          },
        ],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": path.join(__dirname, "../../../node_modules/@emotion/react"),
          "emotion-theming": path.join(__dirname, "../../../node_modules/@emotion/react"),
        },
      },
    };
  },
};
