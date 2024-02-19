/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC, ButtonAction, IconType } from "generic-view/utils"
import { ButtonBase } from "./button-base/button-base"
import Icon from "../icon/icon"
import { withConfig } from "../utils/with-config"

type ButtonModifiers = "link" | "uppercase" | "hover-underline"

interface Config {
  text: string
  icon?: IconType
  action: ButtonAction
  modifiers?: ButtonModifiers[]
}

export const ButtonText: APIFC<undefined, Config> = ({
  data,
  config,
  ...props
}) => {
  return (
    <Button
      {...props}
      action={config!.action}
      $modifiers={config?.modifiers}
    >
      {config?.icon && <Icon data={{ type: config.icon }} />}
      <span>{config?.text}</span>
    </Button>
  )
}

export default withConfig(ButtonText)

const Button = styled(ButtonBase)<{ $modifiers?: ButtonModifiers[] }>`
  span {
    font-size: ${({ theme }) => theme.fontSize.buttonLink};
    line-height: ${({ theme }) => theme.lineHeight.buttonLink};
    color: ${({ theme }) => theme.color.grey1};
    letter-spacing: 0.05em;
    text-transform: unset;
    transition: color 0.15s ease-in-out;
  }
  &:hover span {
    color: ${({ theme }) => theme.color.black};
  }

  ${({ $modifiers }) => $modifiers?.includes("link") && buttonLinkModifier};
  ${({ $modifiers }) =>
    $modifiers?.includes("uppercase") && buttonUpperCaseModifier};
  ${({ $modifiers }) =>
    $modifiers?.includes("hover-underline") && buttonHoverUnderlineModifier};
`

const buttonLinkModifier = css`
  span {
    color: ${({ theme }) => theme.color.blue2};
  }
  &:hover span {
    color: ${({ theme }) => theme.color.blue2};
  }
`

const buttonUpperCaseModifier = css`
  span {
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSize.buttonText};
    line-height: ${({ theme }) => theme.lineHeight.buttonText};
    letter-spacing: 0.1em;
  }
`

const buttonHoverUnderlineModifier = css`
  &:hover span {
    text-decoration: underline;
    text-decoration-color: currentColor;
  }
`
