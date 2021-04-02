import styled from "styled-components"
import { Color } from "Theme/color"
import { getColor } from "Theme/theme-getters"

interface Props {
  color?: Color
  size?: number
}

export const Icon = styled("span")<Props>`
  font-family: "Mudita Icons" !important;
  font-style: normal;
  font-weight: normal !important;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${({ color }) => (color ? getColor(color) : "inherit")};
  font-size: ${({ size = 2 }) => (size ? `${size}rem` : "inherit")};
`
