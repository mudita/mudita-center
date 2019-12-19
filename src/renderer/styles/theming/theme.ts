const columnWidth = 6.5
const gutterWidth = 4

/**
 * All colors from palette.
 * TODO: sync them with colors in theme and use abstract names.
 */
// const white = "#FFFFFF"
// const black = "#000000"
// const grey1 = "#3B3F42"
// const grey2 = "#F4F5F6"
// const grey3 = "#CDCECF"
// const grey4 = "#6A6A6A"
// const grey5 = "#FBFBFB"
// const grey6 = "#D2D6DB"
// const blue1 = "#6D9BBC"
// const blue2 = "#3E6988"
// const blue3 = "#F3F8FC"
// const red1 = "#E96A6A"

const theme = {
  color: {
    text: {
      black: "#000000",
      grey: "#CDCECF",
      primary: "#0f0f1a",
      inverted: "#FFFFFF",
      faded: "#6A6A6A",
      supplementary: "#6D9BBC",
      placeholder: "#A5A5A5",
      dark: "#000000",
    },
    background: {
      light: "#ffffff",
      dark: "#000000",
      dark2: "#232426",
      grey: "#CDCECF",
      grey2: "#F4F5F6",
      grey3: "#E9E9E9",
      inputDark: "#3B3F42",
      accent: "#F4F5F6",
      primaryDark: "#F4F5F6",
    },
    border: {
      dark: "#000000",
      default: "#CDCECF",
      grey: "#CDCECF",
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
    small: 0.15,
    medium: 0.4,
    big: 0.12,
  },
  letterSpacing: {
    negative: -0.06,
    smaller: 0.02,
    small: 0.04,
    medium: 0.075,
    regular: 0.1,
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
    smallPopUp: 27.5,
    mediumPopUp: 38,
  },
}

export type Theme = typeof theme

export default theme
