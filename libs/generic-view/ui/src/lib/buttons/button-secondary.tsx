/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { ButtonPrimary } from "./button-primary"
import { ButtonSecondaryConfig } from "generic-view/models"

export const ButtonSecondary: APIFC<undefined, ButtonSecondaryConfig> = (
  props
) => {
  return <Button {...props} />
}

const Button = styled(ButtonPrimary)`
  background-color: ${({ theme }) => theme.color.white};
  border: 0.1rem solid ${({ theme }) => theme.color.black};

  span {
    color: ${({ theme }) => theme.color.black};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.grey5};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.white};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.white};
    border-color: ${({ theme }) => theme.color.grey4};

    span {
      color: ${({ theme }) => theme.color.grey3};
    }
  }
`
