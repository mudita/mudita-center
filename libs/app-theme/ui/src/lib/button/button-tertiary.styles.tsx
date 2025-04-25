/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { Link } from "react-router"
import {
  baseStyles,
  ButtonIcon,
  StyledButtonProps,
  StyledLinkProps,
} from "./button-base.styles"

const tertiaryDefaultStyles = css`
  background-color: transparent;
  transition: color 0.15s ease-in-out;
  color: ${({ theme }) => theme.app.color.grey1};
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  height: 2.4rem;

  ${ButtonIcon} {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: ${({ theme }) => theme.app.space.xs};
  }
`

const tertiaryHoverStyles = css`
  color: ${({ theme }) => theme.app.color.black};
`

const tertiaryActiveStyles = css`
  color: ${({ theme }) => theme.app.color.grey1};
`

const tertiaryDisabledStyles = css`
  color: ${({ theme }) => theme.app.color.grey3};
  cursor: not-allowed;
`

export const TertiaryButtonComponent = styled.button<StyledButtonProps>`
  ${baseStyles};
  ${tertiaryDefaultStyles};

  &:hover {
    ${tertiaryHoverStyles};
  }
  &:active {
    ${tertiaryActiveStyles};
  }
  &:disabled {
    ${tertiaryDisabledStyles};
  }
`

export const TertiaryNavigationComponent = styled(Link)<StyledLinkProps>`
  ${baseStyles};
  ${tertiaryDefaultStyles};

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${tertiaryDisabledStyles};
        `
      : css`
          &:hover {
            ${tertiaryHoverStyles};
          }

          &:active {
            ${tertiaryActiveStyles};
          }
        `};
`
