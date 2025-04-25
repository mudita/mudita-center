/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import { ButtonSize } from "app-theme/models"
import { Icon } from "../icon/icon"

export type StyledButtonProps = {
  $size: ButtonSize
}
export type StyledLinkProps = {
  $size: ButtonSize
  $disabled?: boolean
}

export const baseStyles = css<StyledButtonProps>`
  border: none;
  border-radius: ${({ theme }) => theme.app.radius.sm};
  appearance: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0 1rem;
  letter-spacing: 0.1em;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  user-select: none;

  ${({ $size }) => {
    switch ($size) {
      case ButtonSize.Small:
        return css`
          width: 11.8rem;
        `
      case ButtonSize.Medium:
        return css`
          width: 15.6rem;
        `
      case ButtonSize.Large:
        return css`
          width: 17.6rem;
        `
      case ButtonSize.AutoMin:
        return css`
          width: fit-content;
        `
      case ButtonSize.AutoMax:
      default:
        return css`
          width: 100%;
        `
    }
  }}
`

export const ButtonIcon = styled(Icon)``
