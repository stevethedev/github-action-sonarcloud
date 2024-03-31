declare const SVG_ICON_BASE_URL: string;

export const gradeIcon = (
  grade: "A" | "B" | "C" | "D" | "E",
  fontSize: number = 14,
): string => {
  return `<img src="${SVG_ICON_BASE_URL}/grade/${grade.toLowerCase()}.svg" width="${fontSize}" height="${fontSize}" alt="Grade: ${grade}" />`;
};
