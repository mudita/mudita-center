/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { Icon } from "../../../icon/icon"
import { APIFC, IconType } from "generic-view/utils"
import { ModalTitleIconConfig } from "generic-view/models"
import { spinAnimation } from "../../../shared/spinner-loader"

export const ModalTitleIcon: APIFC<undefined, ModalTitleIconConfig> = ({
  data,
  config,
  children,
  ...rest
}) => {
  if (!config?.type) return null
  const spin =
    config.type === IconType.Spinner || config.type === IconType.SpinnerDark
  return <TitleIcon config={config} $spin={spin} {...rest} />
}

export const TitleIcon = styled(Icon)<{ $spin?: boolean }>`
  width: 6.8rem;
  height: 6.8rem;
  padding: ${({ theme }) => theme.space.md};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grey5};
  align-self: center;

  ${({ $spin }) => $spin && spinAnimation}
`
