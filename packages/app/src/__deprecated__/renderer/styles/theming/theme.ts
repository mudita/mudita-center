/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const columnWidth = 7.2
const gutterWidth = 3.2
const auto = "auto"

const blue1 = "#40749a"
const blue2 = "#6d9bbc"
const blue3 = "#aebec9"
const blue4 = "#e3f3ff"
const blue5 = "#f2f7fa"

const black = "#000000"
const grey1 = "#3b3f42"
const grey2 = "#6a6a6a"
const grey3 = "#a5a5a5"
const grey4 = "#d2d6db"
const grey5 = "#f4f5f6"
const grey6 = "#fbfbfb"
const transparentBlack1 = "rgba(0, 0, 0, 0.05)"
const transparentBlack2 = "rgba(0, 0, 0, 0.08)"
const transparentBlack3 = "rgba(0, 0, 0, 0.3)"

const red = "#e96a6a"
const green = "#dfefde"
const orange = "#FD9900"

const white = "#ffffff"

const theme = {
  color: {
    text: {
      accent: grey5,
      action: blue2,
      active: white,
      disabled: grey3,
      error: red,
      primary: black,
      secondary: grey2,
      iconBody: white,
      iconUser: blue3,
      tabHover: grey1,
      actionHover: blue1,
      warning: orange,
    },
    background: {
      activity: blue2,
      disabled: grey4,
      icon: blue5,
      main: grey6,
      message: blue5,
      minor: grey5,
      primary: grey1,
      primaryHover: black,
      row: white,
      scroll: grey3,
      super: black,
      chartBar: blue4,
      modal: white,
      modalBackdrop: transparentBlack3,
      error: red,
      lightIcon: white,
      green: green,
    },
    border: {
      white: white,
      error: red,
      hover: grey1,
      list: grey4,
      primary: black,
      secondary: grey4,
      separator: grey4,
      smallSeparator: grey4,
      verticalSeparator: grey3,
      tetheringSeparator: blue3,
    },
    boxShadow: {
      full: transparentBlack2,
      light: transparentBlack1,
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
    medium: 0.4,
    regular: 0.8,
    big: 1.2,
  },
  letterSpacing: {
    negative: -0.02,
    neutral: 0,
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
    buttonBig: columnWidth * 3 + gutterWidth * 2,
    buttonMedium: columnWidth * 2 + gutterWidth,
    buttonSmall: 13.2,
    viewWidth: columnWidth * 12 + gutterWidth * 13,
    menuWidth: columnWidth * 3 + gutterWidth * 3,
    scrollbar: 0.2,
    auto: auto,
  },
  zIndex: {
    content: 1,
    menu: 2,
    dropdown: 3,
    tooltip: 4,
    modalBackdrop: 5,
    modal: 6,
    passCodeModal: 10,
  },
}

export type Theme = typeof theme

export default theme
