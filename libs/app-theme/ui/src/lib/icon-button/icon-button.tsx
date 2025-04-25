/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { IconSize, IconType } from "app-theme/models"
import { Button, ButtonDefaultProps, ButtonLinkProps } from "../button/button"
import { Icon } from "../icon/icon"
import styled, { css } from "styled-components"

type Props = {
  icon: IconType
  size?: IconSize
  disabled?: boolean
} & (ButtonLinkProps | ButtonDefaultProps)

export const IconButton: FunctionComponent<Props> = ({
  icon,
  size = IconSize.Medium,
  ...rest
}) => {
  return (
    <StyledButton {...rest} $disabled={rest.disabled}>
      <Icon type={icon} size={size} />
    </StyledButton>
  )
}

const iconButtonHoverStyles = css`
  background-color: ${({ theme }) => theme.app.color.grey6};
`

const iconButtonActiveStyles = css`
  background-color: transparent;
`

const iconButtonDisabledStyles = css`
  color: ${({ theme }) => theme.app.color.grey3};
  background-color: transparent;
  cursor: not-allowed;
`

const StyledButton = styled(Button)<{ $disabled?: boolean }>`
  border: none;
  color: ${({ theme }) => theme.app.color.black};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  appearance: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: auto;
  height: auto;
  aspect-ratio: 1;
  transition-property: background-color, color;
  transition-duration: ${({ theme }) =>
    theme.app.constants.buttonTransitionDuration}ms;
  transition-timing-function: ease-in-out;

  ${({ $disabled }) =>
    $disabled
      ? css`
          ${iconButtonDisabledStyles} !important;
        `
      : css`
          &:hover {
            ${iconButtonHoverStyles}
          }
          &:active {
            ${iconButtonActiveStyles}
          }
        `}

  &:disabled {
    ${iconButtonDisabledStyles}
  }
`
