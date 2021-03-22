import React from "react"
import { AppFunctionComponent } from "@mudita/app-function-component"
import styled from "styled-components"
import { fontSize } from "Theme/theme-getters"

interface Properties {
  label: string
  primary?: boolean
  backgroundColor?: string
  size?: "small" | "medium" | "large"
  onClick?: () => void
}

const ButtonWrapper = styled.button`
  font-size: ${fontSize(18)};
`

export const Button: AppFunctionComponent<Properties> = ({
  primary,
  backgroundColor,
  size,
  label,
  ...props
}) => (
  <ButtonWrapper type="button" style={{ backgroundColor }} {...props}>
    {label}
  </ButtonWrapper>
)
