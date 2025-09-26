declare module "modern-normalize";
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
