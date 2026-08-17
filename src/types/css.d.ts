// Type declarations for CSS module imports (Tailwind v4 CSS files)
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
