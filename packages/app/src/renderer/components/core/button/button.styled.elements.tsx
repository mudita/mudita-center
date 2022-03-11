/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Link, NavLink } from "react-router-dom"
import transition from "Renderer/styles/functions/transition"
import theme from "Renderer/styles/theming/theme"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  fontWeight,
  textColor,
  transitionTime,
  transitionTimingFunction,
  width,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"
import { DisplayStyle, Size } from "./button.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { Theme } from "Renderer/styles/theming/theme"

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

const getButtonContentColor = (color: keyof Theme["color"]["text"]) => {
  const styles = css`
    p {
      color: ${textColor(color)};
    }
    g path {
      fill: ${textColor(color)};
    }
  `
  return styles
}

const navLinkStyles = css`
  background-color: ${backgroundColor("minor")};
  * {
    color: ${textColor("primary")};
  }

  svg {
    opacity: 1;
    transition: ${transition("opacity", undefined, "ease")};
  }
`

const disabledPrimaryStyles = css`
  background: ${backgroundColor("disabled")};
  border: 0.1rem solid ${backgroundColor("disabled")};
  ${getButtonContentColor("secondary")}
`

export const disabledSecondaryStyles = css`
  border: 0.1rem solid ${borderColor("secondary")};
  ${getButtonContentColor("disabled")}
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
          border-radius: ${borderRadius("medium")};
          background: ${backgroundColor("primary")};
          border: 0.1rem solid ${backgroundColor("primary")};

          &:hover {
            background: ${backgroundColor("primaryHover")};
          }
          ${getButtonContentColor("active")}
          ${disabled && disabledPrimaryStyles};
        `
      case DisplayStyle.Secondary:
        return css`
          height: 4rem;
          border-radius: ${borderRadius("medium")};
          border: 0.1rem solid ${borderColor("primary")};
          g path {
            fill: ${textColor("primary")};
          }
          ${disabled && disabledSecondaryStyles};
          &:hover {
            background: ${backgroundColor("minor")};
          }
        `
      case DisplayStyle.IconOnly:
        return css`
          opacity: 0.6;
          transition: opacity ${transitionTime("quick")}
            ${transitionTimingFunction("smooth")};
          border-radius: ${borderRadius("small")};
          width: 2.4rem;
          height: 2.4rem;
          background: transparent;
          border: none;
          &:hover {
            background: ${backgroundColor("minor")};
            opacity: 1;
          }
          svg {
            height: initial;
            width: initial;
          }
        `
      case DisplayStyle.IconOnlyWithBackground:
        return css`
          opacity: 0.75;
          transition: opacity ${transitionTime("quick")}
            ${transitionTimingFunction("smooth")};
          background-color: ${backgroundColor("super")};
          border-radius: 50%;
          width: 3.2rem;
          height: 3.2rem;
          border: none;
          &:hover {
            border-radius: 50%;
            opacity: 1;
            background-color: ${backgroundColor("super")};
            svg path {
              fill: ${textColor("active")};
            }
          }
          svg {
            height: initial;
            width: initial;
            path {
              fill: ${textColor("active")};
            }
          }
        `
      case DisplayStyle.InputIcon:
        return css`
          justify-content: flex-start;
          height: 3.2rem;
          width: 3.2rem;
          border: none;
          padding: 0;
          ${disabled && {
            opacity: 0.4,
          }};
          &:hover {
            background: ${backgroundColor("minor")};
          }
        `
      case DisplayStyle.Link:
        return css`
          justify-content: flex-start;
          height: 2.4rem;
          padding: 0;
          border: none;
          opacity: 0.8;
          width: 100%;
          &:hover {
            opacity: 1;
          }
          ${disabled && getButtonContentColor("disabled")}
        `
      case DisplayStyle.LinkWithParagraph:
        return css`
          justify-content: flex-start;
          height: 3.2rem;
          padding: 0;
          border: none;
          border-radius: ${borderRadius("small")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("minor")};
          }
        `
      case DisplayStyle.ActionLink:
        return css`
          justify-content: flex-start;
          height: 4rem;
          padding: 0.8rem;
          border: none;
          border-radius: ${borderRadius("small")};
          font-weight: ${fontWeight("default")};
          width: 100%;
          &:hover {
            background-color: ${backgroundColor("minor")};
            ${getButtonContentColor("actionHover")}
          }
          g path {
            fill: ${textColor("action")};
          }
          p {
            color: ${textColor("action")};
          }
        `
      case DisplayStyle.MenuLink:
        return css`
          justify-content: flex-start;
          height: 4rem;
          padding: 0.4rem;
          border: none;
          border-radius: ${borderRadius("medium")};
          font-weight: ${fontWeight("default")};
          width: 100%;
          &.${activeClassName} {
            ${navLinkStyles}
          }
          &:hover {
            ${navLinkStyles}
          }
          svg {
            opacity: 0.6;
          }
          p {
            color: ${textColor("secondary")};
          }
        `
      case DisplayStyle.Tab:
        return css`
          justify-content: flex-start;
          height: 100%;
          padding: 0.8rem 0;
          border: none;
          position: relative;
          width: 100%;
          &:after {
            content: "";
            position: absolute;
            display: block;
            bottom: 0;
            left: 0;
            width: 0;
            height: 0.2rem;
            background-color: ${backgroundColor("super")};
            transition: ${transition("width", undefined, "ease")};
          }
          p {
            color: ${textColor("secondary")};
          }
          svg {
            opacity: 0.75;
          }

          &:hover {
            ${getButtonContentColor("tabHover")}
          }

          &.${activeClassName} {
            ${getButtonContentColor("primary")}
            &:after {
              width: 100%;
            }
          }
        `
      case DisplayStyle.Dropdown:
        return css`
          justify-content: flex-start;
          height: 3.2rem;
          padding: 0.4rem 0.8rem;
          border: none;
          width: 100%;
          min-width: 17.6rem;
          opacity: 0.9;
          &.${activeClassName} {
            background-color: ${backgroundColor("minor")};
          }
          &:hover {
            background-color: ${backgroundColor("minor")};
            ${getButtonContentColor("primary")}
          }
          ${getButtonContentColor("tabHover")}
          ${disabled && getButtonContentColor("disabled")}
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
      if (
        displaystyle === DisplayStyle.Link ||
        displaystyle === DisplayStyle.LinkWithParagraph ||
        displaystyle === DisplayStyle.Dropdown
      ) {
        return css`
          margin-right: 0.4rem;
        `
      }
      return css`
        margin: 0 0.8rem 0 0;
      `
    }
    return css``
  }}

  ${({ displaystyle }) =>
    displaystyle === DisplayStyle.InputIcon &&
    css`
      width: 100%;
      height: 100%;
    `};
`
