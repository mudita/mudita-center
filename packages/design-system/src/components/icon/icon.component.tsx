import styled from "styled-components"
import { Color } from "../../theme/color"
import { getColor } from "../../theme/theme-getters"

interface Props {
  color?: Color
  width?: number
  height?: number
}

export const Icon = styled("span")<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width = 2 }) => width}rem;
  height: ${({ height = 2 }) => height}rem;

  svg {
    width: 100%;
    height: 100%;
    color: ${({ color }) => (color ? getColor(color) : "inherit")};
  }
`
