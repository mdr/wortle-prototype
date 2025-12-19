import nextPlugin from "@next/eslint-plugin-next"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"

const config = [
  {
    ignores: [".next/", "out/", "node_modules/", "playwright/.cache/"],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,
      "@next/next/no-img-element": "off",
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
