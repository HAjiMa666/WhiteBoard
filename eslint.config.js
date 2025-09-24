import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.configs([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      eslintPrettier.configs.recommended,
      "prettier",
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
      "prettier/prettier": "error",
    },
  },
]);
