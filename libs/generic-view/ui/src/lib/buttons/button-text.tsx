/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import { ButtonBase } from "./button-base/button-base"
import { Icon } from "../icon/icon"
import { ButtonTextConfig } from "generic-view/models"

export const ButtonText: APIFC<undefined, ButtonTextConfig> = ({
  data,
  config,
  children,
  ...props
}) => {
  return (
    <Button
      data-testid={`button-text_${props.componentKey}`}
      {...props}
      actions={config.actions}
      $modifiers={config.modifiers}
    >
      {children}
      {config.icon && <Icon className={"icon"} data={{ type: config.icon }} />}
      {config.text}
    </Button>
  )
}

const Button = styled(ButtonBase)<{
  $modifiers?: ButtonTextConfig["modifiers"]
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
    $modifiers?.includes("uppercase") && buttonUpperCaseModifier};
  ${({ $modifiers }) =>
    $modifiers?.includes("hover-underline") && buttonHoverUnderlineModifier};

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

const buttonUpperCaseModifier = css`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.buttonText};
  line-height: ${({ theme }) => theme.lineHeight.buttonText};
  letter-spacing: 0.1em;
  margin-top: 0.1rem;
`

const buttonHoverUnderlineModifier = css`
  &:hover {
    text-decoration: underline;
    text-decoration-color: currentColor;
  }
`
