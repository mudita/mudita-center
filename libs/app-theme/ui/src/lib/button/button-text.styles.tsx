/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { Link } from "react-router"
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
  height: 2.4rem;

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
      padding: 0 0.5rem;
    `};

  ${ButtonIcon} {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: ${({ theme }) => theme.app.space.xs};
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
      background-color: ${({ theme }) => theme.app.color.grey5};
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
      background-color: ${({ theme }) => theme.app.color.grey6};
    `};
`

const textDisabledStyles = css<ModifiersProp>`
  color: ${({ theme }) => theme.app.color.grey3};
  cursor: not-allowed;

  ${({ $modifiers }) =>
    $modifiers?.includes(ButtonTextModifier.Link) &&
    css`
      color: ${({ theme }) => theme.app.color.blue3};
    `};

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

export const TextNavigationComponent = styled(Link)<StyledLinkProps>`
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
