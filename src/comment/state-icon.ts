const SVG_ICON_BASE_URL: string = String(process.env.SVG_ICON_BASE_URL);

export const stateIcon = (
  grade: "pass" | "fail",
  fontSize: number = 14,
): string => {
  return `<img src="${SVG_ICON_BASE_URL}/status/${grade.toLowerCase()}.svg" width="${fontSize}" height="${fontSize}" alt="Grade: ${grade}" />`;
};
