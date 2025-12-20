import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"

const config = [
  {
    ignores: ["dist/", "node_modules/", "playwright/.cache/", "src/routeTree.gen.ts"],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
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
