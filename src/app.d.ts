/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Ambient module declarations for CSS files
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
