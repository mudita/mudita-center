export const spacing = {
  "0": "0",
  "4": ".4rem",
  "8": ".8rem",
  "12": "1.2rem",
  "16": "1.6rem",
  "20": "2rem",
  "24": "2.4rem",
  "32": "3.2rem",
  "40": "4rem",
  "48": "4.8rem",
  "60": "6rem",
  "64": "6.4rem",
} as const

export type Spacing = keyof typeof spacing
