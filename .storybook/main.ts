import type { StorybookConfig } from '@storybook/react-webpack5';


const config: StorybookConfig = {
  stories: [
    "../src/**/**/**/*.mdx",
    "../src/**/**/**/*.stories.@(ts|tsx)",
  ],

  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
    "@storybook/manager-api"
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },

  docs: {
    autodocs: true
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  },
};

export default config;
