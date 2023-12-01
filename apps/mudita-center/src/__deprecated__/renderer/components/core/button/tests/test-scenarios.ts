/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mockDefineMessages } from "App/__deprecated__/renderer/utils/mock-define-messages"
import { DisplayStyle, Size } from "../button.config"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
      Icon: IconType.Upload,
      label: "Click",
    },
    cases: buttonsFixedWidthCases,
  },
  {
    name: "Icon only",
    cases: [
      {
        displayStyle: DisplayStyle.IconOnly,
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
        displayStyle: DisplayStyle.Link,
      },
      {
        displayStyle: DisplayStyle.Link,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: IconType.Upload,
      },
      {
        displayStyle: DisplayStyle.LinkWithParagraph,
      },
      {
        displayStyle: DisplayStyle.LinkWithParagraph,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: IconType.Upload,
      },
      {
        displayStyle: DisplayStyle.ActionLink,
      },
      {
        displayStyle: DisplayStyle.ActionLink,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: IconType.Upload,
      },
      {
        displayStyle: DisplayStyle.MenuLink,
      },
      {
        displayStyle: DisplayStyle.MenuLink,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: IconType.Upload,
      },
      {
        displayStyle: DisplayStyle.Tab,
      },
      {
        displayStyle: DisplayStyle.Tab,
        href: "http://www.google.pl",
        target: "_blank",
        Icon: IconType.Upload,
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
