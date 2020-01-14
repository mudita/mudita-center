import { Link } from "react-router-dom"
import Svg from "Renderer/components/core/svg/svg.component"
import transition from "Renderer/styles/functions/transition"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  fontWeight,
  textColor,
  width,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"
import { DisplayStyle, Size } from "./button.config"

const getSize = (size: Size) => {
  switch (size) {
    case Size.FixedSmall:
      return css`
        width: ${width("buttonSmall")};
      `
    case Size.FixedMedium:
      return css`
        width: ${width("buttonMedium")};
      `
    case Size.FixedBig:
      return css`
        width: ${width("buttonBig")};
      `
    default:
      return
  }
}

const buttonStyles = css<{
  displayStyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background: none;
  transition: ${transition("background")}, ${transition("border")};
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
      case DisplayStyle.Primary:
        return css`
          height: 4rem;
          color: ${textColor("inverted")};
          border-radius: ${borderRadius("medium")}rem;
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
      case DisplayStyle.Secondary:
        return css`
          height: 4rem;
          border-radius: ${borderRadius("medium")}rem;
          ${disabled
            ? css`
                border: 0.1rem solid ${borderColor("grey")};
                g {
                  fill: ${textColor("grey")};
                }
              `
            : css`
                border: 0.1rem solid ${borderColor("hover")};
                g {
                  fill: ${textColor("black")};
                }
              `}
          &:hover {
            border-color: ${borderColor("dark")};
          }
        `
      case DisplayStyle.IconOnly1:
        return css`
          height: 4rem;
          width: 4rem;
          border: 0.1rem solid ${borderColor("hover")};
          border-radius: ${borderRadius("small")}rem;
          &:hover {
            border-color: ${borderColor("dark")};
          }
        `
      case DisplayStyle.IconOnly2:
        return css`
          height: 3.2rem;
          width: 3.2rem;
          border-radius: ${borderRadius("small")}rem;
          background: transparent;
          border: none;
          &:hover {
            background: ${backgroundColor("grey2")};
          }
        `
      case DisplayStyle.IconOnly3:
        return css`
          height: 3.2rem;
          width: 3.2rem;
          border-radius: ${borderRadius("small")}rem;
          background: transparent;
          border: none;
          &:hover {
            background: ${backgroundColor("grey3")};
          }
          g {
            fill: ${textColor("supplementary")};
          }
        `
      case DisplayStyle.Link1:
        return css`
          justify-content: flex-start;
          height: 3rem;
          padding: 0.8rem;
          border: none;
          border-radius: ${borderRadius("small")}rem;
          font-weight: ${fontWeight("default")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("grey2")};
          }
        `
      case DisplayStyle.Link2:
        return css`
          justify-content: flex-start;
          height: 4rem;
          padding: 0.8rem;
          border: none;
          border-radius: ${borderRadius("medium")}rem;
          font-weight: ${fontWeight("default")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("grey2")};
          }
        `
      case DisplayStyle.Link3:
        return css`
          justify-content: flex-start;
          height: 4rem;
          padding: 0.8rem;
          border: none;
          border-radius: ${borderRadius("small")}rem;
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
      case DisplayStyle.Link4:
        return css`
          justify-content: flex-start;
          height: 4rem;
          padding: 0.8rem;
          border: none;
          border-radius: ${borderRadius("small")}rem;
          color: ${textColor("faded")};
          font-weight: ${fontWeight("default")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("grey2")};
          }
          g {
            fill: ${textColor("faded")};
          }
        `
      default:
        return
    }
  }}
`

export const StyledLink = styled(Link)<{
  displayStyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  ${buttonStyles}
`
export const StyledA = styled.a<{
  displayStyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  ${buttonStyles}
`
export const StyledButton = styled.button<{
  displayStyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  ${buttonStyles}
`
export const StyledIcon = styled(Svg)<{
  displayStyle: DisplayStyle
  withMargin: boolean
}>`
  ${({ displayStyle, withMargin }) => {
    if (withMargin) {
      if (displayStyle === DisplayStyle.Link2) {
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
