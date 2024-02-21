/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, ButtonAction, IconType } from "generic-view/utils"
import { ButtonBase } from "./button-base/button-base"
import Icon from "../icon/icon"
import { withConfig } from "../utils/with-config"

interface Config {
  text: string
  icon?: IconType
  action: ButtonAction
}

export const ButtonPrimary: APIFC<undefined, Config> = ({
  data,
  config,
  ...props
}) => {
  return (
    <Button {...props} action={config!.action}>
      {config?.icon && <Icon data={{ type: config.icon }} />}
      <span>{config?.text}</span>
    </Button>
  )
}

export default withConfig(ButtonPrimary)

const Button = styled(ButtonBase)`
  justify-content: center;
  background-color: ${({ theme }) => theme.color.grey1};
  height: 4rem;
  padding: 0 1rem;
  transition: background-color 0.15s ease-in-out;
  border-radius: ${({ theme }) => theme.radius.sm};

  span {
    font-size: ${({ theme }) => theme.fontSize.buttonText};
    line-height: ${({ theme }) => theme.lineHeight.buttonText};
    color: ${({ theme }) => theme.color.white};
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.black};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.grey1};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.grey4};

    span {
      color: ${({ theme }) => theme.color.grey2};
    }
  }
`
