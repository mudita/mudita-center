/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { DisplayStyle, Size } from "../button.config"
import { Type } from "Renderer/components/core/icon/icon.config"

const message = mockDefineMessages()

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
      Icon: Type.Upload,
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
        Icon: Type.Upload,
      },
      {
        displayStyle: DisplayStyle.Link2,
      },
      {
        displayStyle: DisplayStyle.Link2,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Type.Upload,
      },
      {
        displayStyle: DisplayStyle.Link3,
      },
      {
        displayStyle: DisplayStyle.Link3,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Type.Upload,
      },
      {
        displayStyle: DisplayStyle.Link4,
      },
      {
        displayStyle: DisplayStyle.Link4,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Type.Upload,
      },
      {
        displayStyle: DisplayStyle.Tab,
      },
      {
        displayStyle: DisplayStyle.Tab,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: Type.Upload,
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
        labelMessage: message,
        size: Size.FixedBig,
      },
    ],
  },
]
