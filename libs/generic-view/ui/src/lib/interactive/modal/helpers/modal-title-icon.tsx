/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { Icon } from "../../../icon/icon"
import { APIFC } from "generic-view/utils"
import { ModalTitleIconConfig } from "generic-view/models"

export const ModalTitleIcon: APIFC<undefined, ModalTitleIconConfig> = ({
  config,
  children,
  ...rest
}) => {
  return <TitleIcon config={config} {...rest} />
}

export const TitleIcon = styled(Icon)`
  width: 6.8rem;
  height: 6.8rem;
  padding: ${({ theme }) => theme.space.md};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grey5};
  align-self: center;
`
