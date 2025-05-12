import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import perfectionist from "eslint-plugin-perfectionist";
import path from "path";
import { fileURLToPath } from "url";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  perfectionist.configs["recommended-natural"],
  {
    ignores: ["dist", "eslint.config.mjs"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ...reactPlugin.configs.flat.recommended,
    ...reactHooks.configs["recommended-latest"],
    languageOptions: {
      ...reactPlugin.configs.flat.languageOptions,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ["tsconfig.eslint.json"],
        tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
      },
    },
  }
);
