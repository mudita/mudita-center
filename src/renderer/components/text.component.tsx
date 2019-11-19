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
        `
      case TextDisplayStyle.SecondaryBoldHeading:
        return css`
          font-size: ${24 / 16}rem;
          line-height: ${20 / 24}em;
          font-weight: ${fontWeight("bold")};
        `
      case TextDisplayStyle.TertiaryBoldHeading:
        return css`
          ${tertiaryHeadingSharedStyles};
          font-weight: ${fontWeight("bold")};
        `
      case TextDisplayStyle.TertiaryMediumHeading:
        return tertiaryHeadingSharedStyles
      case TextDisplayStyle.LargeBoldMediumText:
        return css`
          ${largeTextSharedStyles};
          font-weight: ${fontWeight("bold")};
        `
      case TextDisplayStyle.LargeMediumText:
        return largeTextSharedStyles
      case TextDisplayStyle.LargeFadedMediumText:
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
          color: ${textColor("faded")};
          opacity: ${opacity("regular")};
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
        `
      case TextDisplayStyle.MediumFadedLightText:
        return css`
          ${mediumTextSharedStyles};
          color: ${textColor("faded")};
          font-weight: ${fontWeight("light")};
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
        `
      case TextDisplayStyle.SmallSupplementaryText:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
          color: ${textColor("supplementary")};
        `
      case TextDisplayStyle.SmallTextInverted:
        return css`
          ${smallTextSharedStyles};
          ${uppercaseStyles};
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
          color: ${textColor("faded")};
          opacity: ${opacity("regular")};
        `
      default:
        return null
    }
  }}
`

interface Props {
  readonly stringId?: string
  readonly as?: Element
  readonly displayStyle?: TextDisplayStyle
}

export enum TextDisplayStyle {
  Default,
  PrimaryHeading,
  SecondaryBoldHeading,
  TertiaryBoldHeading,
  TertiaryMediumHeading,
  LargeBoldMediumText,
  LargeMediumText,
  LargeFadedMediumText,
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
  [TextDisplayStyle.TertiaryMediumHeading]: "h3",
  [TextDisplayStyle.LargeBoldMediumText]: "p",
  [TextDisplayStyle.LargeMediumText]: "p",
  [TextDisplayStyle.LargeFadedMediumText]: "p",
  [TextDisplayStyle.MediumBoldText]: "p",
  [TextDisplayStyle.MediumLightText]: "p",
  [TextDisplayStyle.MediumFadedLightText]: "p",
  [TextDisplayStyle.MediumText]: "p",
  [TextDisplayStyle.MediumFadedText]: "p",
  [TextDisplayStyle.SmallTextInverted]: "p",
}

const Text: FunctionComponent<Props> = ({
  children,
  stringId,
  displayStyle = TextDisplayStyle.Default,
  as,
}) => (
  <TextWrapper as={as || mapping[displayStyle]} displayStyle={displayStyle}>
    {stringId ? <FormattedMessage id={stringId} /> : children}
  </TextWrapper>
)

export default Text
