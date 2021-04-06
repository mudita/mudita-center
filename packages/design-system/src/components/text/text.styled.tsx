import styled, { css } from "styled-components"
import { getColor, getFontSize, getFontWeight } from "../../theme/theme-getters"
import { TextStyleProps } from "./text.interface"
import { TextDecorators } from "./text.type"

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
