import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.component"
import Upload from "Renderer/svg/upload.svg"

const buttonsFixedWidthCases = [
  {
    displayStyle: DisplayStyle.primary,
    size: Size.fixedBig,
  },
  {
    displayStyle: DisplayStyle.primary,
    size: Size.fixedBig,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.primary,
    size: Size.fixedMedium,
  },
  {
    displayStyle: DisplayStyle.primary,
    size: Size.fixedMedium,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.primary,
    size: Size.fixedSmall,
  },
  {
    displayStyle: DisplayStyle.primary,
    size: Size.fixedSmall,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.secondary,
    size: Size.fixedBig,
  },
  {
    displayStyle: DisplayStyle.secondary,
    size: Size.fixedBig,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.secondary,
    size: Size.fixedMedium,
  },
  {
    displayStyle: DisplayStyle.secondary,
    size: Size.fixedMedium,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.secondary,
    size: Size.fixedSmall,
  },
  {
    displayStyle: DisplayStyle.secondary,
    size: Size.fixedSmall,
    disabled: true,
  },
]

export default [
  {
    name: "Standard/fixed width",
    commonProps: {
      label: "Click",
    },
    cases: buttonsFixedWidthCases,
  },
  {
    name: "Standard/fixed width with icon",
    commonProps: {
      Icon: Upload,
      label: "Click",
    },
    cases: buttonsFixedWidthCases,
  },
  {
    name: "Icon only",
    cases: [
      {
        displayStyle: DisplayStyle.iconOnly1,
      },
      {
        displayStyle: DisplayStyle.iconOnly2,
      },
      {
        displayStyle: DisplayStyle.iconOnly3,
      },
    ],
  },
  {
    name: "Links",
    cases: [
      {
        displayStyle: DisplayStyle.link1,
      },
      {
        displayStyle: DisplayStyle.link1,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.link2,
      },
      {
        displayStyle: DisplayStyle.link2,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.link3,
      },
      {
        displayStyle: DisplayStyle.link3,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
    ],
  },
]
