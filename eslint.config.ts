import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"
import react from "eslint-plugin-react"

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
