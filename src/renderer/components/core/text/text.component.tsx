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
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const tertiaryHeadingSharedStyles = css`
  font-size: 1.8rem;
  line-height: 1.1;
`

const largeTextSharedStyles = css`
  font-size: 1.6rem;
  line-height: 1.05;
`

const mediumTextSharedStyles = css`
  font-size: 1.4rem;
  line-height: 1.05;
`

const smallTextSharedStyles = css`
  font-size: 1.2rem;
  line-height: 1.15;
`

const uppercaseStyles = css`
  text-transform: uppercase;
`

const TextWrapper = styled.div<{ displayStyle: TextDisplayStyle }>`
  ${({ displayStyle }) => {
    switch (displayStyle) {
      case TextDisplayStyle.PrimaryHeading:
        return css`
          font-size: 5.6rem;
          line-height: 1.1;
          font-weight: ${fontWeight("light")};
        `
      case TextDisplayStyle.SecondaryBoldHeading:
        return css`
          font-size: 2.4rem;
          line-height: 0.8;
          font-weight: ${fontWeight("bold")};
          letter-spacing: ${letterSpacing("negative")}rem;
        `
      case TextDisplayStyle.TertiaryBoldHeading:
        return css`
          ${tertiaryHeadingSharedStyles};
          font-weight: ${fontWeight("bold")};
        `
      case TextDisplayStyle.TertiaryHeading:
        return css`
          ${tertiaryHeadingSharedStyles};
          font-weight: ${fontWeight("default")};
        `
      case TextDisplayStyle.LargeBoldText:
        return css`
          ${largeTextSharedStyles};
          font-weight: ${fontWeight("bold")};
          letter-spacing: ${letterSpacing("smaller")}rem;
        `
      case TextDisplayStyle.LargeText:
        return largeTextSharedStyles
      case TextDisplayStyle.LargeFadedText:
        return css`
          ${largeTextSharedStyles};
          color: ${textColor("faded")};
        `
      case TextDisplayStyle.LargeTextCapitalLetters:
        return css`
          ${largeTextSharedStyles};
          ${uppercaseStyles};
        `
      case TextDisplayStyle.LargeFadedTextCapitalLetters:
        return css`
          ${largeTextSharedStyles};
          ${uppercaseStyles};
          color: ${textColor("faded")};
        `
      case TextDisplayStyle.LargeFadedDimTextCapitalLetters:
        return css`
          ${largeTextSharedStyles};
          ${uppercaseStyles};
          font-weight: ${fontWeight("bold")};
          color: ${textColor("faded")};
          opacity: ${opacity("regular")};
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
          color: ${textColor("faded")};
          font-weight: ${fontWeight("light")};
          letter-spacing: ${letterSpacing("small")}rem;
        `
      case TextDisplayStyle.MediumText:
        return mediumTextSharedStyles
      case TextDisplayStyle.MediumFadedText:
        return css`
          ${mediumTextSharedStyles};
          color: ${textColor("faded")};
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
          color: ${textColor("supplementary")};
          letter-spacing: ${letterSpacing("regular")}rem;
        `
      case TextDisplayStyle.SmallTextInverted:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
          display: inline;
          color: ${textColor("inverted")};
          background-color: ${backgroundColor("dark")};
          letter-spacing: ${letterSpacing("regular")}rem;
        `
      case TextDisplayStyle.SmallFadedText:
        return css`
          ${smallTextSharedStyles};
          color: ${textColor("faded")};
          letter-spacing: ${letterSpacing("small")}rem;
        `
      case TextDisplayStyle.SmallFadedDimText:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
          font-weight: ${fontWeight("bold")};
          color: ${textColor("faded")};
          opacity: ${opacity("regular")};
          letter-spacing: ${letterSpacing("medium")}rem;
        `
      default:
        return null
    }
  }}
`

interface Props {
  readonly element?: Element
  readonly message?: MessageInterface
  readonly displayStyle?: TextDisplayStyle
}

export enum TextDisplayStyle {
  Default,
  PrimaryHeading,
  SecondaryBoldHeading,
  TertiaryBoldHeading,
  TertiaryHeading,
  LargeBoldText,
  LargeText,
  LargeFadedText,
  LargeTextCapitalLetters,
  LargeFadedTextCapitalLetters,
  LargeFadedDimTextCapitalLetters,
  MediumBoldText,
  MediumLightText,
  MediumFadedLightText,
  MediumText,
  MediumFadedText,
  SmallText,
  SmallSupplementaryText,
  SmallTextInverted,
  SmallFadedText,
  SmallFadedDimText,
}

interface ElementsMapping {
  [key: number]: Element
}

type Element = "div" | "h1" | "h2" | "h3" | "span" | "p"

const mapping: ElementsMapping = {
  [TextDisplayStyle.Default]: "div",
  [TextDisplayStyle.PrimaryHeading]: "h1",
  [TextDisplayStyle.SecondaryBoldHeading]: "h2",
  [TextDisplayStyle.TertiaryBoldHeading]: "h3",
  [TextDisplayStyle.TertiaryHeading]: "h3",
  [TextDisplayStyle.LargeBoldText]: "p",
  [TextDisplayStyle.LargeText]: "p",
  [TextDisplayStyle.LargeFadedText]: "p",
  [TextDisplayStyle.LargeTextCapitalLetters]: "p",
  [TextDisplayStyle.LargeFadedTextCapitalLetters]: "p",
  [TextDisplayStyle.LargeFadedDimTextCapitalLetters]: "p",
  [TextDisplayStyle.MediumBoldText]: "p",
  [TextDisplayStyle.MediumLightText]: "p",
  [TextDisplayStyle.MediumFadedLightText]: "p",
  [TextDisplayStyle.MediumText]: "p",
  [TextDisplayStyle.MediumFadedText]: "p",
  [TextDisplayStyle.SmallText]: "p",
  [TextDisplayStyle.SmallSupplementaryText]: "p",
  [TextDisplayStyle.SmallTextInverted]: "p",
  [TextDisplayStyle.SmallFadedText]: "p",
  [TextDisplayStyle.SmallFadedDimText]: "p",
}

const Text: FunctionComponent<Props> = ({
  children,
  displayStyle = TextDisplayStyle.Default,
  message,
  element,
  className = "",
}) => (
  <TextWrapper
    className={className}
    as={element || mapping[displayStyle]}
    displayStyle={displayStyle}
  >
    {message ? <FormattedMessage {...message} /> : children}
  </TextWrapper>
)

export default Text
