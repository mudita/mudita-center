import { AppFunctionComponent } from "@mudita/app-function-component"
import React from "react"
import styled from "styled-components"
import { getColor, getFontSize, Color } from "../../.."

interface Props {
  color: Color
  text?: string
}

const ColorText = styled("p")<Props>`
  color: ${({ color }) => getColor(color)};
  font-size: ${getFontSize("16")};
`

const Box = styled("div")<Props>`
  display: block;
  width: 100%;
  height: 5rem;
  background-color: ${({ color }) => getColor(color)};
`

const ColorBoxWrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  align-items: center;
`

export const ColorBox: AppFunctionComponent<Props> = ({ color, text }) => (
  <ColorBoxWrapper>
    <Box color={color} />
    <ColorText color={color}>{text}</ColorText>
  </ColorBoxWrapper>
)
