import { Link } from "react-router-dom"
import Svg from "Renderer/components/core/svg/svg.component"
import styled, { css } from "styled-components"

import { DisplayStyle, Size } from "./button.component"

import {
  backgroundColor,
  borderColor,
  fontWeight,
  textColor,
  width,
} from "Renderer/styles/theming/theme-getters"

const getSize = (size: Size) => {
  switch (size) {
    case Size.fixedSmall:
      return css`
        width: ${width("buttonSmall")};
      `
    case Size.fixedMedium:
      return css`
        width: ${width("buttonMedium")};
      `
    case Size.fixedBig:
      return css`
        width: ${width("buttonBig")};
      `
    default:
      return
  }
}

const getStyles = css<{
  displayStyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background: none;
  transition: all 0.5s linear;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  ${({ size }) => getSize(size)}
  ${({ disabled }) =>
    disabled &&
    `
      pointer-events: none;
  `}
  ${({ displayStyle, disabled }) => {
    switch (displayStyle) {
      case DisplayStyle.primary:
        return css`
          height: 4rem;
          color: ${textColor("inverted")};
          border-radius: 0.4rem;
          ${disabled
            ? css`
                background: ${backgroundColor("grey")};
                border: 0.1rem solid ${backgroundColor("grey")};
              `
            : css`
                background: ${backgroundColor("inputDark")};
                border: 0.1rem solid ${backgroundColor("inputDark")};
              `}
          &:hover {
            background: ${backgroundColor("dark2")};
          }
          g {
            fill: ${textColor("inverted")};
          }
        `
      case DisplayStyle.secondary:
        return css`
          height: 4rem;
          border-radius: 0.4rem;
          ${disabled
            ? css`
                border: 0.2rem solid ${borderColor("grey")};
                g {
                  fill: ${textColor("grey")};
                }
              `
            : css`
                border: 0.2rem solid ${borderColor("hover")};
                g {
                  fill: ${textColor("black")};
                }
              `}
          &:hover {
            border-color: ${borderColor("dark")};
          }
        `
      case DisplayStyle.iconOnly1:
        return css`
          height: 4rem;
          width: 4rem;
          border: 0.1rem solid ${borderColor("hover")};
          border-radius: 0.2rem;
          &:hover {
            border-color: ${borderColor("dark")};
          }
        `
      case DisplayStyle.iconOnly2:
        return css`
          height: 3.2rem;
          width: 3.2rem;
          border-radius: 0.2rem;
          background: transparent;
          border: none;
          &:hover {
            background: ${backgroundColor("grey2")};
          }
        `
      case DisplayStyle.iconOnly3:
        return css`
          height: 3.2rem;
          width: 3.2rem;
          border-radius: 0.2rem;
          background: transparent;
          border: none;
          &:hover {
            background: ${backgroundColor("grey3")};
          }
          g {
            fill: ${textColor("supplementary")};
          }
        `
      case DisplayStyle.link1:
        return css`
          justify-content: flex-start;
          height: 3rem;
          padding: 0.8rem;
          border: none;
          border-radius: 0.2rem;
          font-weight: ${fontWeight("default")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("grey2")};
          }
        `
      case DisplayStyle.link2:
        return css`
          justify-content: flex-start;
          height: 4rem;
          padding: 0.8rem;
          border: none;
          border-radius: 0.2rem;
          font-weight: ${fontWeight("default")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("grey2")};
          }
        `
      case DisplayStyle.link3:
        return css`
          justify-content: flex-start;
          height: 4rem;
          padding: 0.8rem;
          border: none;
          border-radius: 0.2rem;
          color: ${textColor("supplementary")};
          font-weight: ${fontWeight("default")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("grey2")};
          }
          g {
            fill: ${textColor("supplementary")};
          }
        `
      default:
        return
    }
  }}
`

export const StyledLink = styled(Link)`
  ${getStyles}
`
export const StyledA = styled.a`
  ${getStyles}
`
export const StyledButton = styled.button`
  ${getStyles}
`
export const StyledIcon = styled(Svg)<{
  displayStyle: DisplayStyle
  isLabel: boolean
}>`
  ${({ displayStyle, isLabel }) => {
    if (isLabel) {
      if (displayStyle === DisplayStyle.link2) {
        return css`
          margin: 0 1.2rem 0 0;
        `
      }
      return css`
        margin: 0 0.8rem 0 0;
      `
    }
    return css``
  }}
`
