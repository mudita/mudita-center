/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, IconType } from "generic-view/utils"
import React from "react"
import styled from "styled-components"
import { getIcon } from "./get-icon.helper"
import { IconConfig, IconData } from "generic-view/models"

const StyledIcon = styled.div`
  color: inherit;
  width: 3.2rem;
  height: 3.2rem;
  & > * {
    width: 100%;
    height: 100%;
  }
`

export const Icon: APIFC<IconData, IconConfig> = ({
  data,
  config,
  children,
  ...rest
}) => {
  const iconType = (data?.type || config?.type) as IconType
  const SVGToDisplay = getIcon(iconType)
  return (
    <StyledIcon data-testid={`icon-${iconType}`} {...rest}>
      <SVGToDisplay />
    </StyledIcon>
  )
}
