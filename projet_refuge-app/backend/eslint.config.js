import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node
      },
      ecmaVersion: 2022,
      sourceType: "module"
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'error',
      'import/no-commonjs': 'error',
      'import/no-nodejs-modules': 'off',
    }
  },
  {
    files: ["swagger.config.js"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      "no-undef": "off",
      "import/no-nodejs-modules": "off"
    }
  },
  {
    files: ["test/**/*.js"],
    plugins: {
      "jest": jestPlugin
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  }
];