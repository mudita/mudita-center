import { defineMessages } from "react-intl"
import Upload from "Renderer/svg/upload.svg"
import { DisplayStyle, Size } from "../button.config"

const exampleMessageId = "view.name.news"
const messages = defineMessages({
  exampleMessage: { id: exampleMessageId },
})

const buttonsFixedWidthCases = [
  {
    displayStyle: DisplayStyle.Primary,
    size: Size.FixedBig,
  },
  {
    displayStyle: DisplayStyle.Primary,
    size: Size.FixedBig,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Primary,
    size: Size.FixedMedium,
  },
  {
    displayStyle: DisplayStyle.Primary,
    size: Size.FixedMedium,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Primary,
    size: Size.FixedSmall,
  },
  {
    displayStyle: DisplayStyle.Primary,
    size: Size.FixedSmall,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    size: Size.FixedBig,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    size: Size.FixedBig,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    size: Size.FixedMedium,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    size: Size.FixedMedium,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    size: Size.FixedSmall,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    size: Size.FixedSmall,
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
        displayStyle: DisplayStyle.IconOnly1,
      },
      {
        displayStyle: DisplayStyle.IconOnly2,
      },
      {
        displayStyle: DisplayStyle.IconOnly3,
      },
    ],
  },
  {
    name: "Links",
    commonProps: {
      label: "Click",
    },
    cases: [
      {
        displayStyle: DisplayStyle.Link1,
      },
      {
        displayStyle: DisplayStyle.Link1,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.Link2,
      },
      {
        displayStyle: DisplayStyle.Link2,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.Link3,
      },
      {
        displayStyle: DisplayStyle.Link3,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.Link4,
      },
      {
        displayStyle: DisplayStyle.Link4,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.Tab,
      },
      {
        displayStyle: DisplayStyle.Tab,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Upload,
      },
    ],
  },
  {
    name: "With intl message",
    cases: [
      {
        displayStyle: DisplayStyle.Primary,
        label: "Click",
        size: Size.FixedBig,
      },
      {
        displayStyle: DisplayStyle.Primary,
        labelMessage: messages.exampleMessage,
        size: Size.FixedBig,
      },
    ],
  },
]
