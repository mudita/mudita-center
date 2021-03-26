export const fontSize = {
  "12": "1.2rem",
  "14": "1.4rem",
  "16": "1.6rem",
  "18": "1.8rem",
  "24": "2.4rem",
  "32": "3.2rem",
  "40": "4rem",
  "56": "5.6rem",
} as const

export type FontSize = keyof typeof fontSize
