/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Text = "text",
}

export enum ButtonSize {
  /**
   * width: fit-content
   */
  AutoMin = "auto-min",

  /**
   * width: 100%
   */
  AutoMax = "auto-max",

  /**
   * width: 11.8rem
   */
  Small = "small",

  /**
   * width: 15.6rem
   */
  Medium = "medium",

  /**
   * width: 16.4rem
   */
  Big = "big",

  /**
   * width: 17.6rem
   */
  Large = "large",
}

export enum ButtonTextModifier {
  DefaultCase = "default-case",
  Link = "link",
  HoverUnderline = "hover-underline",
  HoverBackground = "hover-background",
  Danger = "danger",
  Inline = "inline",
}
