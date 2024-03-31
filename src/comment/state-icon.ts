declare const SVG_ICON_BASE_URL: string;

export const stateIcon = (
  grade: "pass" | "fail",
  fontSize: number = 14,
): string => {
  return `<img src="${SVG_ICON_BASE_URL}/status/${grade.toLowerCase()}.svg" width="${fontSize}" height="${fontSize}" alt="Grade: ${grade}" />`;
};
