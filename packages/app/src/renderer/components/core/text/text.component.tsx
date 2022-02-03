/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FormattedMessage } from "react-intl"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import {
  backgroundColor,
  fontWeight,
  letterSpacing,
  opacity,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import { Theme } from "Renderer/styles/theming/theme"

export const uppercaseTextSharedStyles = css`
  font-size: 1.2rem;
  line-height: 1.67;
  font-weight: ${fontWeight("default")};
  letter-spacing: ${letterSpacing("regular")}rem;
  text-transform: uppercase;
`

export const paragraph1SharedStyles = css`
  font-size: 1.6rem;
  line-height: 1.5;
  letter-spacing: ${letterSpacing("smaller")}rem;
`

export const paragraph3SharedStyles = css`
  font-size: 1.4rem;
  line-height: 1.57;
  letter-spacing: ${letterSpacing("small")}rem;
`

export const largeTextSharedStyles = css`
  font-size: 1.6rem;
  line-height: 1.05;
`

export const smallTextSharedStyles = css`
  font-size: 1.2rem;
  line-height: 1.2;
`

const extraSmallTextSharedStyles = css`
  font-size: 1rem;
`

const fadedDimStyles = css`
  font-weight: ${fontWeight("bold")};
  color: ${textColor("secondary")};
  opacity: ${opacity("regular")};
`

const uppercaseStyles = css`
  text-transform: uppercase;
`

export const getTextStyles = (displayStyle: TextDisplayStyle) => {
  switch (displayStyle) {
    case TextDisplayStyle.PrimaryHeading:
      return css`
        font-size: 4rem;
        line-height: 1.2;
        font-weight: ${fontWeight("default")};
        letter-spacing: ${letterSpacing("negative")}rem;
      `
    case TextDisplayStyle.SecondaryHeading:
      return css`
        font-size: 3.2rem;
        line-height: 1.25;
        font-weight: ${fontWeight("default")};
      `
    case TextDisplayStyle.TertiaryHeading:
      return css`
        font-size: 2.4rem;
        line-height: 1.33;
        font-weight: ${fontWeight("bold")};
        letter-spacing: ${letterSpacing("negative")}rem;
      `
    case TextDisplayStyle.QuaternaryHeading:
      return css`
        font-size: 1.6rem;
        line-height: 1.5;
        font-weight: ${fontWeight("bold")};
        letter-spacing: ${letterSpacing("smaller")}rem;
      `
    case TextDisplayStyle.FifthHeading:
      return css`
        font-size: 1.4rem;
        line-height: 1.57;
        font-weight: ${fontWeight("bold")};
        letter-spacing: ${letterSpacing("small")}rem;
      `
    case TextDisplayStyle.Paragraph1:
      return paragraph1SharedStyles
    case TextDisplayStyle.Paragraph2:
      return css`
        ${paragraph1SharedStyles}
        font-weight: ${fontWeight("light")};
      `
    case TextDisplayStyle.Paragraph3:
      return paragraph3SharedStyles
    case TextDisplayStyle.Paragraph4:
      return css`
        ${paragraph3SharedStyles}
        font-weight: ${fontWeight("light")};
      `
    case TextDisplayStyle.Title:
      return uppercaseTextSharedStyles
    case TextDisplayStyle.Button:
      return uppercaseTextSharedStyles
    case TextDisplayStyle.Label:
      return css`
        font-size: 1.2rem;
        line-height: 1.67;
        font-weight: ${fontWeight("default")};
        letter-spacing: ${letterSpacing("small")}rem;
      `
    case TextDisplayStyle.SmallFadedText:
      return css`
        ${smallTextSharedStyles};
        color: ${textColor("secondary")};
        letter-spacing: ${letterSpacing("small")}rem;
      `
    case TextDisplayStyle.SmallFadedLightText:
      return css`
        ${smallTextSharedStyles};
        color: ${textColor("secondary")};
        letter-spacing: ${letterSpacing("small")}rem;
        font-weight: ${fontWeight("light")};
      `
    default:
      return null
  }
}

const TextWrapper = styled.div<{
  displayStyle: TextDisplayStyle
  color: keyof Theme["color"]["text"]
}>`
  margin: 0;
  ${({ displayStyle }) => getTextStyles(displayStyle)};
  color: ${({ color }) => textColor(color)};
`

export interface TextProps {
  readonly element?: Element
  readonly message?: MessageInterface
  readonly displayStyle?: TextDisplayStyle
  readonly color?: keyof Theme["color"]["text"]
}

export enum TextDisplayStyle {
  Default,
  PrimaryHeading,
  SecondaryHeading,
  TertiaryHeading,
  QuaternaryHeading,
  FifthHeading,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
  Title,
  Button,
  Label,
  SmallFadedText,
  SmallFadedLightText,
}

interface ElementsMapping {
  [key: number]: Element
}

type Element = "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "span" | "p" | "li"

const mapping: ElementsMapping = {
  [TextDisplayStyle.Default]: "div",
  [TextDisplayStyle.PrimaryHeading]: "h1",
  [TextDisplayStyle.SecondaryHeading]: "h2",
  [TextDisplayStyle.TertiaryHeading]: "h3",
  [TextDisplayStyle.QuaternaryHeading]: "h4",
  [TextDisplayStyle.FifthHeading]: "h5",
  [TextDisplayStyle.SmallFadedText]: "p",
  [TextDisplayStyle.SmallFadedLightText]: "p",
  [TextDisplayStyle.Paragraph1]: "p",
  [TextDisplayStyle.Paragraph2]: "p",
  [TextDisplayStyle.Paragraph3]: "p",
  [TextDisplayStyle.Paragraph4]: "p",
  [TextDisplayStyle.Title]: "p",
  [TextDisplayStyle.Button]: "p",
  [TextDisplayStyle.Label]: "p",
}

const Text: FunctionComponent<TextProps> = ({
  children,
  displayStyle = TextDisplayStyle.Default,
  message,
  element,
  className = "",
  color = "primary",
  ...rest
}) => (
  <TextWrapper
    className={className}
    as={element || mapping[displayStyle]}
    displayStyle={displayStyle}
    {...rest}
    color={color}
  >
    {message ? <FormattedMessage {...message} /> : children}
  </TextWrapper>
)

export default Text
