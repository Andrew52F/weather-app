import path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";


const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config: any, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(__dirname, "../src/styles"),
      '@pages': path.resolve(__dirname, "../src/components/pages"),
      '@layout': path.resolve(__dirname, "../src/components/layout"),
      '@ui': path.resolve(__dirname, "../src/components/ui"),
      '@contexts': path.resolve(__dirname, "../src/contexts"),
      '@types': path.resolve(__dirname, "../src/types"),
      '@assets': path.resolve(__dirname, "../src/assets"),
      '@localization': path.resolve(__dirname, "../src/localization"),
      '@utils': path.resolve(__dirname, "../src/utils"),
      '@store': path.resolve(__dirname, "../src/store"),
      '@hooks': path.resolve(__dirname, "../src/hooks")
    };
    return config;
  }
};
export default config;