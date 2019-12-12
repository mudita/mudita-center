const columnWidth = 6.5
const gutterWidth = 4

const theme = {
  color: {
    text: {
      active: "#191C20",
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
      inputDark: "#3B3F42",
      accent: "#F4F5F6",
    },
    border: {
      active: "#191C20",
      dark: "#000000",
      default: "#CDCECF",
      hover: "#3B3F42",
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
  width: {
    viewWidth: columnWidth * 12 + gutterWidth * 13,
    menuWidth: columnWidth * 3 + gutterWidth * 3,
  },
}

export type Theme = typeof theme

export default theme
