export const fontWeight = {
  light: "300",
  normal: "400",
  bold: "700",
} as const

export type FontWeight = keyof typeof fontWeight
