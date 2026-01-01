import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"
import react from "eslint-plugin-react"
import jsxA11y from "eslint-plugin-jsx-a11y"
import unusedImports from "eslint-plugin-unused-imports"

const config = [
  {
    ignores: ["dist/", "node_modules/", "playwright/.cache/", "src/routeTree.gen.ts", "*.config.*"],
  },
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
      react,
      "jsx-a11y": jsxA11y,
      "unused-imports": unusedImports,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/no-unescaped-entities": "off",
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["src/tests/playwright/**/*.tsx"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
]

export default config
