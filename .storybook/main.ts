import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-webpack5-compiler-swc',
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
};
export default config;
