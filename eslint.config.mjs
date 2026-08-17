import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Lucide's <Image> JSX component is not an HTML <img> — disable false positive
      "jsx-a11y/alt-text": "off",
      // aria-current used on buttons instead of aria-selected
      "jsx-a11y/role-supports-aria-props": "warn",
    },
  },
];

export default eslintConfig;
