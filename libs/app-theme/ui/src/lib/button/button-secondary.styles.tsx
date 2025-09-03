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

const secondaryDefaultStyles = css`
  padding: 0 0.9rem;
  background-color: ${({ theme }) => theme.app.color.white};
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  color: ${({ theme }) => theme.app.color.black};
  height: 4rem;
  border: 0.1rem solid ${({ theme }) => theme.app.color.black};

  ${ButtonIconWrapper} {
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const secondaryHoverStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey5};
`

const secondaryActiveStyles = css`
  background-color: ${({ theme }) => theme.app.color.white};
`

const secondaryDisabledStyles = css`
  border-color: ${({ theme }) => theme.app.color.grey4};
  background-color: ${({ theme }) => theme.app.color.white};
  color: ${({ theme }) => theme.app.color.grey3};
  cursor: not-allowed;
`

export const secondaryButtonStyles = css<StyledButtonProps>`
  ${baseStyles};
  ${secondaryDefaultStyles};

  &:hover {
    ${secondaryHoverStyles};
  }
  &:active {
    ${secondaryActiveStyles};
  }
  &:disabled {
    ${secondaryDisabledStyles};
  }
`

export const secondaryNavigationStyles = css<StyledLinkProps>`
  ${baseStyles};
  ${secondaryDefaultStyles};

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${secondaryDisabledStyles};
        `
      : css`
          &:hover {
            ${secondaryHoverStyles};
          }

          &:active {
            ${secondaryActiveStyles};
          }
        `};
`
