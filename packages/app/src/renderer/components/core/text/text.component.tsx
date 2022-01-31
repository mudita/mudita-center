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

export const uppercaseTextSharedStyles = css`
  font-size: 1.2rem;
  line-height: 1.67;
  font-weight: ${fontWeight("default")};
  letter-spacing: ${letterSpacing("regular")}rem;
  text-transform: uppercase;
`

export const biggerTextSharedStyles = css`
  font-size: 1.6rem;
  line-height: 1.5;
  letter-spacing: ${letterSpacing("smaller")}rem;
`

export const textSharedStyles = css`
  font-size: 1.4rem;
  line-height: 1.57;
  letter-spacing: ${letterSpacing("small")}rem;
`

export const largeTextSharedStyles = css`
  font-size: 1.6rem;
  line-height: 1.05;
`

export const mediumTextSharedStyles = css`
  font-size: 1.4rem;
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
        font-size: 40rem;
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
    case TextDisplayStyle.BiggerText:
      return biggerTextSharedStyles
    case TextDisplayStyle.BiggerLightText:
      return css`
        ${biggerTextSharedStyles}
        font-weight: ${fontWeight("light")};
      `
    case TextDisplayStyle.Text:
      return textSharedStyles
    case TextDisplayStyle.LightText:
      return css`
        ${textSharedStyles}
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
    case TextDisplayStyle.LargeFadedTextCapitalLetters:
      return css`
        ${largeTextSharedStyles};
        ${uppercaseStyles};
        color: ${textColor("secondary")};
      `
    case TextDisplayStyle.LargeFadedDimTextCapitalLetters:
      return css`
        ${largeTextSharedStyles};
        ${uppercaseStyles};
        ${fadedDimStyles};
        letter-spacing: ${letterSpacing("regular")}rem;
      `
    case TextDisplayStyle.MediumBoldText:
      return css`
        ${mediumTextSharedStyles};
        font-weight: ${fontWeight("bold")};
      `
    case TextDisplayStyle.MediumLightText:
      return css`
        ${mediumTextSharedStyles};
        line-height: 1.8rem;
        font-weight: ${fontWeight("light")};
        letter-spacing: ${letterSpacing("small")}rem;
      `
    case TextDisplayStyle.MediumFadedLightText:
      return css`
        ${mediumTextSharedStyles};
        line-height: 1.8rem;
        color: ${textColor("secondary")};
        font-weight: ${fontWeight("light")};
        letter-spacing: ${letterSpacing("small")}rem;
      `
    case TextDisplayStyle.MediumTextUppercased:
      return css`
        ${mediumTextSharedStyles};
        text-transform: uppercase;
        letter-spacing: ${letterSpacing("medium")}rem;
      `
    case TextDisplayStyle.MediumText:
      return mediumTextSharedStyles
    case TextDisplayStyle.MediumFadedText:
      return css`
        ${mediumTextSharedStyles};
        color: ${textColor("secondary")};
      `
    case TextDisplayStyle.MediumFadedTextUppercased:
      return css`
        ${mediumTextSharedStyles};
        text-transform: uppercase;
        color: ${textColor("secondary")};
      `
    case TextDisplayStyle.SmallText:
      return css`
        ${smallTextSharedStyles};
        ${uppercaseStyles};
        letter-spacing: ${letterSpacing("regular")}rem;
      `
    case TextDisplayStyle.SmallSupplementaryText:
      return css`
        ${smallTextSharedStyles};
        ${uppercaseStyles};
        color: ${textColor("action")};
        letter-spacing: ${letterSpacing("regular")}rem;
      `
    case TextDisplayStyle.SmallTextInverted:
      return css`
        ${smallTextSharedStyles};
        ${uppercaseStyles};
        display: inline;
        color: ${textColor("active")};
        background-color: ${backgroundColor("super")};
        letter-spacing: ${letterSpacing("regular")}rem;
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
    case TextDisplayStyle.SmallFadedDimText:
      return css`
        ${smallTextSharedStyles};
        ${uppercaseStyles};
        ${fadedDimStyles};
        letter-spacing: ${letterSpacing("medium")}rem;
      `
    case TextDisplayStyle.ExtraSmallFadedDimText:
      return css`
        ${extraSmallTextSharedStyles};
        ${uppercaseStyles};
        ${fadedDimStyles};
        letter-spacing: ${letterSpacing("medium")}rem;
      `
    default:
      return null
  }
}

const TextWrapper = styled.div<{ displayStyle: TextDisplayStyle }>`
  margin: 0;
  ${({ displayStyle }) => getTextStyles(displayStyle)};
`

export interface TextProps {
  readonly element?: Element
  readonly message?: MessageInterface
  readonly displayStyle?: TextDisplayStyle
}

export enum TextDisplayStyle {
  Default,
  PrimaryHeading,
  SecondaryHeading,
  TertiaryHeading,
  QuaternaryHeading,
  FifthHeading,
  BiggerText,
  BiggerLightText,
  Text,
  LightText,
  Title,
  Button,
  Label,
  LargeFadedTextCapitalLetters,
  LargeFadedDimTextCapitalLetters,
  MediumBoldText,
  MediumLightText,
  MediumFadedLightText,
  MediumFadedTextUppercased,
  MediumTextUppercased,
  MediumText,
  MediumFadedText,
  SmallText,
  SmallSupplementaryText,
  SmallTextInverted,
  SmallFadedText,
  SmallFadedLightText,
  SmallFadedDimText,
  ExtraSmallFadedDimText,
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
  [TextDisplayStyle.LargeFadedTextCapitalLetters]: "p",
  [TextDisplayStyle.LargeFadedDimTextCapitalLetters]: "p",
  [TextDisplayStyle.MediumBoldText]: "p",
  [TextDisplayStyle.MediumLightText]: "p",
  [TextDisplayStyle.MediumFadedLightText]: "p",
  [TextDisplayStyle.MediumText]: "p",
  [TextDisplayStyle.MediumFadedText]: "p",
  [TextDisplayStyle.MediumFadedTextUppercased]: "p",
  [TextDisplayStyle.MediumTextUppercased]: "p",
  [TextDisplayStyle.SmallText]: "p",
  [TextDisplayStyle.SmallSupplementaryText]: "p",
  [TextDisplayStyle.SmallTextInverted]: "p",
  [TextDisplayStyle.SmallFadedText]: "p",
  [TextDisplayStyle.SmallFadedLightText]: "p",
  [TextDisplayStyle.SmallFadedDimText]: "p",
  [TextDisplayStyle.ExtraSmallFadedDimText]: "p",
  [TextDisplayStyle.BiggerText]: "p",
  [TextDisplayStyle.BiggerLightText]: "p",
  [TextDisplayStyle.Text]: "p",
  [TextDisplayStyle.LightText]: "p",
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
  ...rest
}) => (
  <TextWrapper
    className={className}
    as={element || mapping[displayStyle]}
    displayStyle={displayStyle}
    {...rest}
  >
    {message ? <FormattedMessage {...message} /> : children}
  </TextWrapper>
)

export default Text
