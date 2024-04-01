const SVG_ICON_BASE_URL: string = String(process.env.SVG_ICON_BASE_URL);

export const severityIcon = (
  severity: "high" | "medium" | "low",
  fontSize: number = 14,
): string => {
  return `<img src="${SVG_ICON_BASE_URL}/grade/${severity}.svg" width="${fontSize}" height="${fontSize}" alt="Severity: ${severity}" />`;
};
