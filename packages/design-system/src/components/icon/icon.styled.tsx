import styled from "styled-components"
import { Color } from "Theme/color"
import { getColor } from "Theme/theme-getters"

export const IconWrapper = styled("span")<{ color?: Color }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;

  svg {
    color: ${({ color }) => (color ? getColor(color) : "inherit")};
  }
`
