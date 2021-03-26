export const color = {
  black: "#000000",
  white: "#ffffff",

  // Grey
  grey100: "#fbfbfb",
  grey200: "#f4f5f6",
  grey300: "#e9e9e9",
  grey400: "#d2d6db",
  grey500: "#cdcecf",
  grey600: "#a5a5a5",
  grey700: "#6a6a6a",
  grey800: "#3b3f42",
  greyA100: "rgba(214, 214, 214, .5)",
  greyA200: "rgba(188, 188, 188, .5)",

  // Blue
  blue100: "#f3f8fc",
  blue200: "#e3f3ff",
  blue300: "#aebec9",
  blue400: "#94a2ae",
  blue500: "#6d9bbc",
  blue600: "#3e6988",
  blueA100: "rgba(148, 162, 174, .2)",

  // Red
  red: "#e96a6a",
} as const

export type Color = keyof typeof color
