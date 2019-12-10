import { defineMessages } from "react-intl"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.component"
import Upload from "Renderer/svg/upload.svg"

const exampleMessageId = "view.name.news"
const messages = defineMessages({
  exampleMessage: { id: exampleMessageId },
})

const buttonsFixedWidthCases = [
  {
    displayStyle: DisplayStyle.Primary,
    label: "Click",
    size: Size.FixedBig,
  },
  {
    displayStyle: DisplayStyle.Primary,
    label: "Click",
    size: Size.FixedBig,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Primary,
    label: "Click",
    size: Size.FixedMedium,
  },
  {
    displayStyle: DisplayStyle.Primary,
    label: "Click",
    size: Size.FixedMedium,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Primary,
    label: "Click",
    size: Size.FixedSmall,
  },
  {
    displayStyle: DisplayStyle.Primary,
    label: "Click",
    size: Size.FixedSmall,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    label: "Click",
    size: Size.FixedBig,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    label: "Click",
    size: Size.FixedBig,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    label: "Click",
    size: Size.FixedMedium,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    label: "Click",
    size: Size.FixedMedium,
    disabled: true,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    label: "Click",
    size: Size.FixedSmall,
  },
  {
    displayStyle: DisplayStyle.Secondary,
    label: "Click",
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
    cases: [
      {
        displayStyle: DisplayStyle.Link1,
        label: "Click",
      },
      {
        displayStyle: DisplayStyle.Link1,
        href: "http://www.google.pl",
        label: "Click",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.Link2,
        label: "Click",
      },
      {
        displayStyle: DisplayStyle.Link2,
        href: "http://www.google.pl",
        label: "Click",
        target: "_blank",
        Icon: Upload,
      },
      {
        displayStyle: DisplayStyle.Link3,
        label: "Click",
      },
      {
        displayStyle: DisplayStyle.Link3,
        href: "http://www.google.pl",
        label: "Click",
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
      },
      {
        displayStyle: DisplayStyle.Primary,
        labelMessage: messages.exampleMessage,
      },
    ],
  },
]
