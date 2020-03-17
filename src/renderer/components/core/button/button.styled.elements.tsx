import { Link, NavLink } from "react-router-dom"
import transition from "Renderer/styles/functions/transition"
import theme from "Renderer/styles/theming/theme"
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
import Icon from "Renderer/components/core/icon/icon.component"

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

export const activeClassName = "active"

const navLinkStyles = css`
  background-color: ${backgroundColor("grey2")};
  * {
    color: ${textColor("black")};
  }

  svg {
    opacity: 1;
    transition: ${transition("opacity", undefined, "ease")};
  }
`

export const disabledPrimaryStyles = css`
  background: ${backgroundColor("grey")};
  border: 0.1rem solid ${backgroundColor("grey")};
`

export const disabledSecondaryStyles = css`
  border: 0.1rem solid ${borderColor("grey")};
  color: ${textColor("grey")};
  g {
    fill: ${textColor("grey")};
  }
`

const buttonStyles = css<{
  displaystyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background: none;
  transition: ${transition(
    "background",
    theme.transitionTime.quick,
    theme.transitionTimingFunction.easeInOut
  )},
    ${transition(
      "color",
      theme.transitionTime.quick,
      theme.transitionTimingFunction.easeInOut
    )},
    ${transition(
      "border",
      theme.transitionTime.quick,
      theme.transitionTimingFunction.easeInOut
    )};
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  ${({ size }) => getSize(size)}
  ${({ disabled }) =>
    disabled &&
    `
      pointer-events: none;
  `}
  ${({ displaystyle, disabled }) => {
    switch (displaystyle) {
      case DisplayStyle.Primary:
        return css`
          height: 4rem;
          color: ${textColor("inverted")};
          border-radius: ${borderRadius("medium")};
          background: ${backgroundColor("inputDark")};
          border: 0.1rem solid ${backgroundColor("inputDark")};
          ${disabled && disabledPrimaryStyles};
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
          border-radius: ${borderRadius("medium")};
          border: 0.1rem solid ${borderColor("hover")};
          g {
            fill: ${textColor("black")};
          }
          ${disabled && disabledSecondaryStyles};
          &:hover {
            border-color: ${borderColor("dark")};
          }
        `
      case DisplayStyle.IconOnly1:
        return css`
          height: 4rem;
          width: 4rem;
          border: 0.1rem solid ${borderColor("hover")};
          border-radius: ${borderRadius("small")};
          &:hover {
            border-color: ${borderColor("dark")};
          }
        `
      case DisplayStyle.IconOnly2:
        return css`
          height: 3.2rem;
          width: 3.2rem;
          border-radius: ${borderRadius("small")};
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
          border-radius: ${borderRadius("small")};
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
          border-radius: ${borderRadius("small")};
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
          border-radius: ${borderRadius("medium")};
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
          border-radius: ${borderRadius("small")};
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
          border-radius: ${borderRadius("small")};
          color: ${textColor("faded")};
          font-weight: ${fontWeight("default")};
          width: 100%;

          &.${activeClassName} {
            ${navLinkStyles}
          }
          &:hover {
            ${navLinkStyles}
          }
          svg {
            opacity: 0.75;
          }
        `
      case DisplayStyle.Tab:
        return css`
          justify-content: flex-start;
          height: 100%;
          padding: 0.8rem;
          border: none;
          position: relative;
          border-radius: ${borderRadius("small")}rem;
          color: ${textColor("faded")};
          font-weight: ${fontWeight("default")};
          width: 100%;

          &:after {
            content: "";
            position: absolute;
            display: block;
            bottom: 0;
            left: 0;
            width: 0;
            height: 0.2rem;
            background-color: ${backgroundColor("dark")};
            transition: ${transition("width", undefined, "ease")};
          }

          &.${activeClassName} {
            color: ${textColor("black")};
            &:after {
              width: 100%;
            }
            svg {
              opacity: 1;
            }
          }
          svg {
            opacity: 0.75;
          }
        `
      default:
        return
    }
  }}
`

export const StyledNavLink = styled(NavLink)<{
  displaystyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  ${buttonStyles}
`

export const StyledLink = styled(Link)<{
  displaystyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  ${buttonStyles}
`
export const StyledA = styled.a<{
  displaystyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  ${buttonStyles}
`
export const StyledButton = styled.button<{
  displaystyle: DisplayStyle
  disabled: boolean
  size: Size
}>`
  ${buttonStyles}
`
export const StyledIcon = styled(Icon)<{
  displaystyle: DisplayStyle
  withMargin: boolean
}>`
  ${({ displaystyle, withMargin }) => {
    if (withMargin) {
      if (displaystyle === DisplayStyle.Link2) {
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
