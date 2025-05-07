module.exports = {
  stories: [
    '../src/components/**/**/*.stories.mdx',
    '../src/components/**/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/themes/Theme.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
};
