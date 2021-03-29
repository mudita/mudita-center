import styled, { css } from "styled-components"
import { getColor, getFontSize, getFontWeight } from "Theme/theme-getters"
import { TextStyleProps } from "Components/text/text.interface"
import { TextDecorators } from "Components/text/text.type"

export const TextWrapper = styled("p")<
  TextStyleProps & { decorators?: TextDecorators[] }
>`
  ${({ size }) =>
    size &&
    css`
      font-size: ${getFontSize(size)};
    `};

  ${({ color }) =>
    color &&
    css`
      color: ${getColor(color)};
    `};

  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${getFontWeight(weight)};
    `};

  ${({ decorators }) => decorators};
`
