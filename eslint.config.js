import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

export default defineConfig([
  globalIgnores(["node_modules/", ".vitepress/cache", ".vitepress/dist"]),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  perfectionist.configs["recommended-natural"],
  {
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-object-types": "off",
      "perfectionist/sort-modules": "off",
    },
  },
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off", // causes errors when using prop ads with TypeScript
    },
  },
  eslintConfigPrettier,
]);
