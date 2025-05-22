/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { NavLink } from "react-router"
import {
  baseStyles,
  ButtonIcon,
  ModifiersProp,
  StyledButtonProps,
  StyledLinkProps,
} from "./button-base.styles"
import { ButtonTextModifier } from "app-theme/models"

const textDefaultStyles = css<ModifiersProp>`
  padding: 0;
  background-color: transparent;
  transition-property: color, background-color;
  transition-duration: ${({ theme }) =>
    theme.app.constants.buttonTransitionDuration}ms;
  transition-timing-function: ${({ theme }) =>
    theme.app.constants.buttonTransitionEasing};
  color: ${({ theme }) => theme.app.color.grey1};
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  height: 3.2rem;
  border-radius: 0;

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.DefaultCase) &&
    css`
      text-transform: initial;
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.Link) &&
    css`
      color: ${({ theme }) => theme.app.color.blue2};
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.HoverBackground) &&
    css`
      color: ${({ theme }) => theme.app.color.grey2};
      padding: 0 1rem;
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.Danger) &&
    css`
      color: ${({ theme }) => theme.app.color.red};
    `};

  &:has(${ButtonIcon}) {
    padding-top: 0.2rem;
  }

  ${ButtonIcon} {
    width: 2.2rem;
    height: 2.2rem;
    margin-top: -0.2rem;
  }
`

const textHoverStyles = css<ModifiersProp>`
  color: ${({ theme }) => theme.app.color.black};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.Link) &&
    css`
      color: ${({ theme }) => theme.app.color.blue1};
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.HoverUnderline) &&
    css`
      text-decoration: underline;
      text-decoration-color: currentColor;
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.HoverBackground) &&
    css`
      color: ${({ theme }) => theme.app.color.black};
      background-color: ${({ theme }) => theme.app.color.grey5};
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.Danger) &&
    css`
      color: ${({ theme }) => theme.app.color.red};
    `};
`

const textActiveStyles = css<ModifiersProp>`
  color: ${({ theme }) => theme.app.color.grey1};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.Link) &&
    css`
      color: ${({ theme }) => theme.app.color.blue2};
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.HoverUnderline) &&
    css`
      text-decoration: underline;
      text-decoration-color: currentColor;
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.HoverBackground) &&
    css`
      color: ${({ theme }) => theme.app.color.black};
      background-color: ${({ theme }) => theme.app.color.grey5};
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.Danger) &&
    css`
      color: ${({ theme }) => theme.app.color.red};
    `};
`

const textDisabledStyles = css<ModifiersProp>`
  color: ${({ theme }) => theme.app.color.grey3};
  cursor: not-allowed;

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.HoverUnderline) &&
    css`
      text-decoration: none;
    `};

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.HoverBackground) &&
    css`
      background-color: transparent;
    `};
`

export const TextButtonComponent = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${textDefaultStyles};

  &:hover {
    ${textHoverStyles};
  }
  &:active {
    ${textActiveStyles};
  }

  &:disabled {
    ${textDisabledStyles};
  }
`

export const TextNavigationComponent = styled(NavLink)<StyledLinkProps>`
  ${baseStyles};
  ${textDefaultStyles};

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${textDisabledStyles};
        `
      : css`
          &:hover {
            ${textHoverStyles};
          }

          &:active {
            ${textActiveStyles};
          }
        `};
`
