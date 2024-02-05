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

export const ButtonText: APIFC<undefined, Config> = ({
  data,
  config,
  ...props
}) => {
  return (
    <Button {...props} action={config?.action as ButtonAction}>
      {config?.icon && <Icon data={{ type: config.icon }} />}
      <span>{config?.text}</span>
    </Button>
  )
}

export default withConfig(ButtonText)

const Button = styled(ButtonBase)`
  span {
    font-size: ${({ theme }) => theme.fontSize.buttonText};
    line-height: ${({ theme }) => theme.lineHeight.buttonText};
    color: ${({ theme }) => theme.color.grey1};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.15s ease-in-out;
  }
  &:hover span {
    color: ${({ theme }) => theme.color.black};
  }
`
