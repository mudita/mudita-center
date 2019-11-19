import * as React from "react"
import { FormattedMessage } from "react-intl"
import { textColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

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
          font-weight: 700;
        `
      case TextDisplayStyle.TertiaryBoldHeading:
        return css`
          font-size: ${18 / 16}rem;
          line-height: ${20 / 18}em;
          font-weight: 700;
        `
      case TextDisplayStyle.TertiaryRegularHeading:
        return css`
          font-size: ${18 / 16}rem;
          line-height: ${20 / 18}em;
        `
      case TextDisplayStyle.LargeBoldRegularText:
        return css`
          font-size: ${16 / 16}rem;
          line-height: ${17 / 16}em;
          font-weight: 700;
        `
      case TextDisplayStyle.LargeRegularText:
        return css`
          font-size: ${16 / 16}rem;
          line-height: ${17 / 16}em;
        `
      case TextDisplayStyle.LargeFadedRegularText:
        return css`
          font-size: ${16 / 16}rem;
          line-height: ${17 / 16}em;
          color: ${textColor("faded")};
        `
      case TextDisplayStyle.RegularBoldText:
        return css`
          font-size: ${14 / 16}rem;
          line-height: ${15 / 14}em;
          font-weight: 700;
        `
      case TextDisplayStyle.RegularLightText:
        return css`
          font-size: ${14 / 16}rem;
          line-height: ${15 / 14}em;
          font-weight: 300;
        `
      case TextDisplayStyle.RegularFadedLightText:
        return css`
          font-size: ${14 / 16}rem;
          line-height: ${15 / 14}em;
          color: ${textColor("faded")};
          font-weight: 300;
        `
      case TextDisplayStyle.RegularText:
        return css`
          font-size: ${14 / 16}rem;
          line-height: ${15 / 14}em;
        `
      case TextDisplayStyle.RegularFadedText:
        return css`
          font-size: ${14 / 16}rem;
          line-height: ${15 / 14}em;
          color: ${textColor("faded")};
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
  TertiaryRegularHeading,
  LargeBoldRegularText,
  LargeRegularText,
  LargeFadedRegularText,
  RegularBoldText,
  RegularLightText,
  RegularFadedLightText,
  RegularText,
  RegularFadedText,
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
  [TextDisplayStyle.TertiaryRegularHeading]: "h3",
  [TextDisplayStyle.LargeBoldRegularText]: "p",
  [TextDisplayStyle.LargeRegularText]: "p",
  [TextDisplayStyle.LargeFadedRegularText]: "p",
  [TextDisplayStyle.RegularBoldText]: "p",
  [TextDisplayStyle.RegularLightText]: "p",
  [TextDisplayStyle.RegularFadedLightText]: "p",
  [TextDisplayStyle.RegularText]: "p",
  [TextDisplayStyle.RegularFadedText]: "p",
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
