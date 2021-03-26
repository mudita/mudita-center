import { ComponentProps } from "react"
import styled from "styled-components"
import { getColor, getFontSize } from "Theme/theme-getters"
import { ColorBox } from "Components/storybook/color/color.component"

type ColorBoxProps = ComponentProps<typeof ColorBox>

export const Text = styled("p")<ColorBoxProps>`
  color: ${({ color }) => getColor(color)};
  font-size: ${getFontSize("16")};
`

export const Box = styled("div")<ColorBoxProps>`
  display: block;
  width: 100%;
  height: 5rem;
  background-color: ${({ color }) => getColor(color)};
`

export const ColorBoxWrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  align-items: center;
`
