export const SVG_ICON_BASE_URL: string = String(process.env.SVG_ICON_BASE_URL);
export default ({
  path,
  size = 14,
  alt,
}: {
  path: string;
  size?: number;
  alt: string;
}): string =>
  `<img src=${JSON.stringify(SVG_ICON_BASE_URL + path)} width=${JSON.stringify(size)} height=${JSON.stringify(size)} alt=${JSON.stringify(alt)} />`;
