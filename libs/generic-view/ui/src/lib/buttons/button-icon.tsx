/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import { ButtonBase } from "./button-base/button-base"
import { Icon } from "../icon/icon"
import { ButtonIconConfig } from "generic-view/models"

export const ButtonIcon: APIFC<undefined, ButtonIconConfig> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Button
      data-testid={`button-icon_${props.componentKey}`}
      {...props}
      actions={config.actions}
      $modifiers={config.modifiers}
    >
      {children}
      {config.icon && <Icon className={"icon"} data={{ type: config.icon }} />}
    </Button>
  )
}

const Button = styled(ButtonBase)<{
  $modifiers?: ButtonIconConfig["modifiers"]
}>`
  color: ${({ theme }) => theme.color.grey1};
  font-size: ${({ theme }) => theme.fontSize.buttonLink};
  line-height: ${({ theme }) => theme.lineHeight.buttonLink};
  letter-spacing: 0.05em;
  text-transform: unset;
  transition: color 0.15s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.color.black};
  }

  ${({ $modifiers }) => $modifiers?.includes("link") && buttonLinkModifier};
  ${({ $modifiers }) =>
    $modifiers?.includes("hover-background") && buttonHoverBackgroundModifier};

  .icon {
    width: 2.2rem;
    height: 2.2rem;

    svg * {
      fill: currentColor;
    }
  }
`

const buttonLinkModifier = css`
  color: ${({ theme }) => theme.color.blue2};
  &:hover {
    color: ${({ theme }) => theme.color.blue2};
  }
`

const buttonHoverBackgroundModifier = css`
  &:hover {
    background-color: ${({ theme }) => theme.color.grey5};
    border-radius: ${({ theme }) => theme.radius.xs};
  }
`
