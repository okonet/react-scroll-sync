const reactPlugin = require("eslint-plugin-react");
const babelParser = require("@babel/eslint-parser");

module.exports = [
  {
    files: ["src/**/*.{js,jsx}"], // Targets .js and .jsx files within the src folder
    ignores: ["node_modules/**"],  // Ignores node_modules
    languageOptions: {
      parser: babelParser, // Use babel-eslint parser directly here
      parserOptions: {
        ecmaVersion: "latest", // Use latest ECMAScript features
        sourceType: "module",  // Use ES modules
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect", // Auto-detects React version
      },
    },
  },
];
