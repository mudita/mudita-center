import { AppFunctionComponent } from "@mudita/app-function-component"
import React from "react"
import { Color } from "Theme/color"
import { Box, ColorBoxWrapper, Text } from "Components/storybook/color/color.styled"

interface Props {
  color: Color
  text?: string
}

export const ColorBox: AppFunctionComponent<Props> = ({ color, text }) => (
  <ColorBoxWrapper>
    <Box color={color} />
    <Text color={color}>{text}</Text>
  </ColorBoxWrapper>
)
