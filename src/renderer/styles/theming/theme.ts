const theme = {
  color: {
    text: {
      primary: "#0f0f1a",
      inverted: "#FFFFFF",
      faded: "#6A6A6A",
      supplementary: "#6D9BBC",
    },
    background: {
      light: "#ffffff",
      dark: "#000000",
    },
    borderColor: {
      dark: "#000000",
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
  letterSpacing: {
    negative: -0.6,
    small: 0.4,
    medium: 0.75,
    regular: 1,
  },
  font: {
    primary:
      "GT Pressura, Arial, Helvetica, Gill Sans, Lucida, Helvetica Narrow, sans-serif",
  },
  grid: {
    columnWidth: 6.5,
    gutterWidth: 4,
  },
  width: {
    viewWidth() {
      return theme.grid.columnWidth * 12 + theme.grid.gutterWidth * 13
    },
    menuWidth() {
      return theme.grid.columnWidth * 3 + theme.grid.gutterWidth * 3
    },
  },
}

export type Theme = typeof theme

export default theme
