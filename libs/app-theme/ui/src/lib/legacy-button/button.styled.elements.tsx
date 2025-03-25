/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Link, NavLink } from "react-router"
import styled, { css, DefaultTheme, keyframes } from "styled-components"
import {
  LegacyButtonDisplayStyle,
  LegacyButtonSize,
  LegacyIconBadgeType,
} from "app-theme/models"
import { LegacyIcon } from "../legacy-icon/icon.component"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  fontWeight,
  textColor,
  transition,
  transitionTime,
  transitionTimingFunction,
} from "app-theme/utils"

const getSize = (size: LegacyButtonSize) => {
  switch (size) {
    case LegacyButtonSize.FixedSmall:
      return css`
        width: ${({ theme }) => theme.legacy.width.buttonSmall}rem;
      `
    case LegacyButtonSize.FixedMedium:
      return css`
        width: ${({ theme }) => theme.legacy.width.buttonMedium}rem;
      `
    case LegacyButtonSize.FixedBig:
      return css`
        width: ${({ theme }) => theme.legacy.width.buttonBig}rem;
      `
    case LegacyButtonSize.Auto:
      return css`
        width: "auto";
      `
    default:
      return
  }
}

export const activeClassName = "active"

const getButtonContentColor = (
  color: keyof DefaultTheme["legacy"]["color"]["text"]
) => {
  return css`
    p {
      color: ${({ theme }) => theme.legacy.color.text[color]};
    }
    g path {
      fill: ${({ theme }) => theme.legacy.color.text[color]};
    }
  `
}

export const buttonTransitionStyles = css`
  ${({ theme }) => css`
    transition:
      ${transition(
        "background",
        theme.legacy.transitionTime.quick,
        theme.legacy.transitionTimingFunction.easeInOut
      )},
      ${transition(
        "color",
        theme.legacy.transitionTime.quick,
        theme.legacy.transitionTimingFunction.easeInOut
      )},
      ${transition(
        "border",
        theme.legacy.transitionTime.quick,
        theme.legacy.transitionTimingFunction.easeInOut
      )},
      ${transition(
        "text-decoration-color",
        theme.legacy.transitionTime.quick,
        theme.legacy.transitionTimingFunction.easeInOut
      )};
  `}
`

const navLinkStyles = css`
  background-color: ${({ theme }) => theme.legacy.color.background.minor};
  * {
    color: ${({ theme }) => theme.legacy.color.text.primary};
    ${buttonTransitionStyles};
  }

  svg {
    opacity: 1;
  }
`

const disabledPrimaryStyles = css`
  background: ${({ theme }) => theme.legacy.color.background.disabled};
  border: 0.1rem solid ${({ theme }) => theme.legacy.color.background.disabled};
  ${getButtonContentColor("secondary")}
`

export const disabledSecondaryStyles = css`
  border: 0.1rem solid ${({ theme }) => theme.legacy.color.border.secondary};
  ${getButtonContentColor("disabled")}
`

const buttonStyles = css<{
  displayStyle: LegacyButtonDisplayStyle
  disabled: boolean
  size: LegacyButtonSize
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background: none;
  padding: 0.1rem 0.7rem;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;
  ${buttonTransitionStyles};
  ${({ size }) => getSize(size)}
  ${({ disabled }) =>
    disabled &&
    `
      pointer-events: none;
  `}
  ${({ displayStyle, disabled }) => {
    switch (displayStyle) {
      case LegacyButtonDisplayStyle.Primary:
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
      case LegacyButtonDisplayStyle.Secondary:
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
      case LegacyButtonDisplayStyle.IconOnly:
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
          ${disabled &&
          css`
            opacity: 0.3;
          `};
        `
      case LegacyButtonDisplayStyle.IconOnlyWithBackground:
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
      case LegacyButtonDisplayStyle.InputIcon:
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
      case LegacyButtonDisplayStyle.Link:
        return css`
          justify-content: flex-start;
          height: 2.4rem;
          padding: 0;
          border: none;
          opacity: 0.8;
          width: 100%;
          ${getButtonContentColor("primary")}
          &:hover {
            opacity: 1;
          }
          ${disabled && getButtonContentColor("disabled")}
        `
      case LegacyButtonDisplayStyle.LinkWithParagraph:
        return css`
          justify-content: flex-start;
          height: 3.2rem;
          padding: 0 0.4rem 0 0;
          border: none;
          border-radius: ${borderRadius("small")};
          width: 100%;
          ${getButtonContentColor("primary")}
          &:hover {
            background-color: ${backgroundColor("minor")};
          }
        `
      case LegacyButtonDisplayStyle.ActionLink:
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
      case LegacyButtonDisplayStyle.MenuLink:
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
          ${disabled && getButtonContentColor("disabled")}
        `
      case LegacyButtonDisplayStyle.Tab:
        return css`
          justify-content: flex-start;
          height: 100%;
          padding: 0.8rem 0;
          border: none;
          position: relative;
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
      case LegacyButtonDisplayStyle.Dropdown:
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
      case LegacyButtonDisplayStyle.BorderlessButton:
        return css`
          height: 3.2rem;
          border-color: transparent;
          text-decoration: underline;
          text-decoration-color: transparent;
          overflow: inherit;
          g path {
            fill: ${textColor("primary")};
          }

          &:hover {
            text-decoration-color: ${textColor("primary")};
          }

          ${disabled && getButtonContentColor("secondary")}
        `
      default:
        return
    }
  }}
`

export const StyledNavLink = styled(NavLink)<{
  displayStyle: LegacyButtonDisplayStyle
  disabled: boolean
  disableWhenActive: boolean
  size: LegacyButtonSize
}>`
  ${buttonStyles};
  border-radius: ${borderRadius("regular")};

  &.${activeClassName} {
    pointer-events: ${({ disableWhenActive }) =>
      disableWhenActive ? "none" : "all"};
  }
`

export const StyledLink = styled(Link)<{
  displayStyle: LegacyButtonDisplayStyle
  disabled: boolean
  size: LegacyButtonSize
}>`
  ${buttonStyles}
`
export const StyledA = styled.a<{
  displayStyle: LegacyButtonDisplayStyle
  disabled: boolean
  size: LegacyButtonSize
}>`
  ${buttonStyles}
`
export const StyledButton = styled.button<{
  displayStyle: LegacyButtonDisplayStyle
  disabled: boolean
  size: LegacyButtonSize
}>`
  ${buttonStyles}
`

const rotateAnimation = keyframes`
  from {
    transform: rotateZ(0deg)
  }
  to {
    transform: rotateZ(360deg)
  }
`

export const StyledIcon = styled(LegacyIcon)<{
  displayStyle: LegacyButtonDisplayStyle
  withMargin: boolean
  rotate?: boolean
  badge: undefined | boolean | LegacyIconBadgeType
  disabled: boolean
}>`
  ${({ displayStyle, withMargin, badge }) => {
    if (withMargin) {
      if (
        displayStyle === LegacyButtonDisplayStyle.Link ||
        displayStyle === LegacyButtonDisplayStyle.LinkWithParagraph ||
        displayStyle === LegacyButtonDisplayStyle.Dropdown
      ) {
        return css`
          margin-right: 0.4rem;
        `
      }
      if (badge === LegacyIconBadgeType.BadgeWithCounter) {
        return css`
          margin: 0 1rem 0 0;
        `
      } else {
        return css`
          margin: 0 0.8rem 0 0;
        `
      }
    }
    return css``
  }}

  ${({ displayStyle }) =>
    displayStyle === LegacyButtonDisplayStyle.InputIcon &&
    css`
      width: 100%;
      height: 100%;
    `};

  ${({ rotate }) =>
    rotate &&
    css`
      animation: ${rotateAnimation} 2s infinite linear;
    `};

  ${({ disabled }) =>
    disabled
      ? css`
          color: ${textColor("secondary")};
        `
      : css``}
`
