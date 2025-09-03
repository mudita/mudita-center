/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { css } from "styled-components"
import {
  baseStyles,
  ButtonIconWrapper,
  StyledButtonProps,
  StyledLinkProps,
} from "./button-base.styles"

const primaryDefaultStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey1};
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  color: ${({ theme }) => theme.app.color.white};
  height: 4rem;

  ${ButtonIconWrapper} {
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const primaryHoverStyles = css`
  background-color: ${({ theme }) => theme.app.color.black};
`

const primaryActiveStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey1};
`

const primaryDisabledStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey4};
  color: ${({ theme }) => theme.app.color.grey2};
  cursor: not-allowed;
`

export const primaryButtonStyles = css<StyledButtonProps>`
  ${baseStyles};
  ${primaryDefaultStyles};

  &:hover {
    ${primaryHoverStyles};
  }
  &:active {
    ${primaryActiveStyles};
  }
  &:disabled {
    ${primaryDisabledStyles};
  }
`

export const primaryNavigationStyles = css<StyledLinkProps>`
  ${baseStyles};
  ${primaryDefaultStyles};

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${primaryDisabledStyles};
        `
      : css`
          &:hover {
            ${primaryHoverStyles};
          }

          &:active {
            ${primaryActiveStyles};
          }
        `};
`
