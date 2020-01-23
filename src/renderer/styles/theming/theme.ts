const columnWidth = 6.5
const gutterWidth = 4

/**
 * All colors from palette.
 */

const black = "#000000"
const grey1 = "#232426"
const grey2 = "#3b3f42"
const grey3 = "#6a6a6a"
const grey4 = "#a5a5a5"
const grey5 = "#fbfbfb"
const grey6 = "#d2d6db"
const grey7 = "#cdcecf"
const grey8 = "#f2f7fa"
const grey9 = "#f4f5f6"
const white = "#ffffff"
const blue = "#3e6988"
const blue1 = "#6d9bbc"
const blue2 = "#aebec9"
const blue3 = "#e3f3ff"
const blue4 = "#f3f8fc"
const red = "#e96a6a"
const red1 = "#e9e9e9"

const theme = {
  color: {
    text: {
      active: "#191C20",
      black: "#000000",
      grey: "#CDCECF",
      primary: "#0f0f1a",
      inverted: "#FFFFFF",
      faded: "#6A6A6A",
      supplementary: "#6D9BBC",
      placeholder: "#A5A5A5",
      dark: "#000000",
      hover: "#3E6988",
    },
    background: {
      blue: "#6D9BBC",
      light: "#ffffff",
      dark: "#000000",
      dark2: "#232426",
      grey: "#CDCECF",
      grey2: "#F4F5F6",
      grey3: "#E9E9E9",
      grey4: "#A5A5A5",
      inputDark: "#3B3F42",
      accent: "#F4F5F6",
      primaryDark: "#F4F5F6",
    },
    border: {
      active: "#191C20",
      dark: "#000000",
      default: "#CDCECF",
      grey: "#CDCECF",
      grey2: "#F4F5F6",
      grey3: "#E9E9E9",
      hover: "#3B3F42",
      listItem: "#D2D6DB",
      light: "#D2D6DB",
    },
    boxShadow: {
      grey: "rgba(188,188,188,0.5)",
    },
  },
  layout: {
    width: "73.75rem",
  },
  breakpoint: {
    tablet: 48,
  },
  opacity: {
    regular: "0.6",
  },
  fontWeight: {
    light: 300,
    default: 400,
    bold: 700,
  },
  height: {
    small: 0.3,
    medium: 0.8,
  },
  borderRadius: {
    small: 0.2,
    medium: 0.5,
    big: 1.2,
  },
  letterSpacing: {
    negative: -0.06,
    smaller: 0.02,
    small: 0.04,
    medium: 0.075,
    regular: 0.1,
  },
  lineHeight: {
    textarea: 1.8,
  },
  font: {
    primary:
      "GT Pressura, Arial, Helvetica, Gill Sans, Lucida, Helvetica Narrow, sans-serif",
  },
  grid: {
    columnWidth,
    gutterWidth,
  },
  transitionTime: {
    standard: "500ms",
  },
  transitionTimingFunction: {
    standard: "linear",
  },
  width: {
    buttonBig: columnWidth * 2 + gutterWidth,
    buttonMedium: gutterWidth * 3,
    buttonSmall: columnWidth + gutterWidth,
    viewWidth: columnWidth * 12 + gutterWidth * 13,
    menuWidth: columnWidth * 3 + gutterWidth * 3,
  },
}

export type Theme = typeof theme

export default theme
