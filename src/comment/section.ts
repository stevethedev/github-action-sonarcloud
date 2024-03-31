export const section = (...text: string[]): string => `${text.join("\n")}\n\n`;

export const inline = (...text: string[]): string => text.join(" ");
