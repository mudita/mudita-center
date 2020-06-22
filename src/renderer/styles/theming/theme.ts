const columnWidth = 6.5
const gutterWidth = 4

const theme = {
  color: {
    text: {
      accent: "#cdcecf", // --grey5
      action: "#6d9bbc", // --blue2
      active: "#ffffff", // --white
      disabled: "#a5a5a5", // --grey3
      error: "#e96a6a", // --red1
      iconHighlight: "#3e6988", // --blue1
      primary: "#000000", // --black
      secondary: "#6a6a6a", // --grey2
    },
    background: {
      activity: "#6d9bbc", // --blue2
      disabled: "#cdcecf", // --grey5,
      icon: "#f3f8fc", // -- blue5
      main: "#fbfbfb", // --grey7
      message: "#f2f7fa", // --messageBlue
      minor: "#f4f5f6", // --grey6,
      minorHover: "#e9e9e9", // --grey8
      primary: "#3b3f42", // --grey1
      primaryHover: "#232426", // --dark
      row: "#ffffff", // --white
      scroll: "#a5a5a5", // --grey3
      super: "#000000", // --black
    },
    border: {
      error: "#e96a6a", // --red1
      hover: "#3b3f42", // --grey1
      list: "#d2d6db", // --grey4
      primary: "#000000", // --black
      secondary: "#cdcecf", // --grey5
      separator: "#e6e8eb", // --grey9
      smallSeparator: "#f4f5f6", // --grey4
      verticalSeparator: "#e9e9e9", // --grey3
    },
    boxShadow: {
      full: "rgba(0, 0, 0, 0.08)", // --grey10
      light: "rgba(214, 214, 214, 0.5)", // transparentGrey2
      semi: "rgba(188,188,188,0.5)", // transparentGrey1
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
    faster: "0.3s",
    quick: "250ms",
    veryQuick: "0.15s",
    slow: "1s",
  },
  transitionTimingFunction: {
    standard: "linear",
    easeInOut: "ease-in-out",
    smooth: "ease-in-out",
  },
  width: {
    buttonBig: columnWidth * 2 + gutterWidth,
    buttonMedium: gutterWidth * 3,
    buttonSmall: columnWidth + gutterWidth,
    viewWidth: columnWidth * 12 + gutterWidth * 13,
    menuWidth: columnWidth * 3 + gutterWidth * 3,
    scrollbar: 0.2,
  },
  zIndex: {
    content: 1,
    menu: 2,
    dropdown: 3,
    modalBackdrop: 4,
    modal: 5,
  },
}

export type Theme = typeof theme

export default theme
