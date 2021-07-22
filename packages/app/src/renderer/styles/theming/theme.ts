/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const columnWidth = 6.5
const gutterWidth = 4

const blue1 = "#3e6988"
const blue2 = "#6d9bbc"
const blue4 = "#e3f3ff"
const blue5 = "#f3f8fc"
const blue6 = "#aebec9"
const messageBlue = "#f2f7fa"

const black = "#000000"
const dark = "#232426"
const grey1 = "#3b3f42"
const grey2 = "#6a6a6a"
const grey3 = "#a5a5a5"
const grey4 = "#d2d6db"
const grey5 = "#cdcecf"
const grey6 = "#f4f5f6"
const grey7 = "#fbfbfb"
const grey8 = "#e9e9e9"
const grey9 = "#e6e8eb"
const grey10 = "rgba(0, 0, 0, 0.08)"
const grey11 = "rgba(0, 0, 0, 0.3)"
const transparentGrey1 = "rgba(188,188,188,0.5)"
const transparentGrey2 = "rgba(214, 214, 214, 0.5)"
const transparentBlue1 = "rgba(148,162,174,0.2)"

const red1 = "#e96a6a"

const white = "#ffffff"

const theme = {
  color: {
    text: {
      accent: grey5,
      action: blue2,
      active: white,
      disabled: grey3,
      error: red1,
      iconHighlight: blue1,
      primary: black,
      secondary: grey2,
      iconBody: white,
      iconUser: blue6,
    },
    background: {
      activity: blue2,
      disabled: grey5,
      icon: blue5,
      main: grey7,
      message: messageBlue,
      minor: grey6,
      minorHover: grey8,
      primary: grey1,
      primaryHover: dark,
      row: white,
      scroll: grey3,
      super: black,
      chartBar: blue4,
      chartBarInactive: grey9,
      chartAxisLine: transparentBlue1,
      chartTooltip: white,
      modal: white,
      modalBackdrop: grey11,
      error: red1,
      lightIcon: white,
    },
    border: {
      error: red1,
      hover: grey1,
      list: grey4,
      primary: black,
      secondary: grey5,
      separator: grey9,
      smallSeparator: grey4,
      verticalSeparator: grey3,
      tetheringSeparator: grey8,
    },
    boxShadow: {
      full: grey10,
      light: transparentGrey2,
      semi: transparentGrey1,
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
    primary: "GT Pressura, Roboto Condensed, sans-serif",
    helper: "caption",
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
    tooltip: 4,
    modalBackdrop: 5,
    modal: 6,
  },
}

export type Theme = typeof theme

export default theme
