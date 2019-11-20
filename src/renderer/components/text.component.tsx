import * as React from "react"
import { FormattedMessage } from "react-intl"
import {
  backgroundColor,
  fontWeight,
  opacity,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const tertiaryHeadingSharedStyles = css`
  font-size: ${18 / 16}rem;
  line-height: ${20 / 18}em;
`

const largeTextSharedStyles = css`
  font-size: ${16 / 16}rem;
  line-height: ${17 / 16}em;
`

const mediumTextSharedStyles = css`
  font-size: ${14 / 16}rem;
  line-height: ${15 / 14}em;
`

const smallTextSharedStyles = css`
  font-size: ${12 / 16}rem;
  line-height: ${14 / 12}em;
`

const uppercaseStyles = css`
  text-transform: uppercase;
`

const TextWrapper = styled.div<{ displayStyle: TextDisplayStyle }>`
  ${({ displayStyle }) => {
    switch (displayStyle) {
      case TextDisplayStyle.PrimaryHeading:
        return css`
          font-size: ${56 / 16}rem;
          line-height: ${62 / 56}em;
          font-weight: ${fontWeight("light")};
        `
      case TextDisplayStyle.SecondaryBoldHeading:
        return css`
          font-size: ${24 / 16}rem;
          line-height: ${20 / 24}em;
          font-weight: ${fontWeight("bold")};
          letter-spacing: -0.6px;
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
          letter-spacing: 1px;
        `
      case TextDisplayStyle.MediumBoldText:
        return css`
          ${mediumTextSharedStyles};
          font-weight: ${fontWeight("bold")};
        `
      case TextDisplayStyle.MediumLightText:
        return css`
          ${mediumTextSharedStyles};
          font-weight: ${fontWeight("light")};
          letter-spacing: 1px;
        `
      case TextDisplayStyle.MediumFadedLightText:
        return css`
          ${mediumTextSharedStyles};
          color: ${textColor("faded")};
          font-weight: ${fontWeight("light")};
          letter-spacing: 0.4px;
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
          letter-spacing: 1px;
        `
      case TextDisplayStyle.SmallSupplementaryText:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
          color: ${textColor("supplementary")};
          letter-spacing: 1px;
        `
      case TextDisplayStyle.SmallTextInverted:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
          display: inline;
          color: ${textColor("inverted")};
          background-color: ${backgroundColor("dark")};
        `
      case TextDisplayStyle.SmallFadedText:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
          color: ${textColor("faded")};
          letter-spacing: 0.4px;
        `
      case TextDisplayStyle.SmallFadedDimText:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
          font-weight: ${fontWeight("bold")};
          color: ${textColor("faded")};
          opacity: ${opacity("regular")};
          letter-spacing: 0.75px;
        `
      default:
        return null
    }
  }}
`

interface Props {
  readonly key?: string
  readonly as?: Element
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
  key,
  displayStyle = TextDisplayStyle.Default,
  as,
}) => (
  <TextWrapper as={as || mapping[displayStyle]} displayStyle={displayStyle}>
    {key ? <FormattedMessage id={key} /> : children}
  </TextWrapper>
)

export default Text
