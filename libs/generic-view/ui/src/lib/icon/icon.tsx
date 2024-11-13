/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC, IconType } from "generic-view/utils"
import React from "react"
import styled from "styled-components"
import { getIcon } from "./get-icon.helper"
import { IconConfig, IconData } from "generic-view/models"

interface IconConfigProps {
  $color?: NonNullable<IconConfig>["color"]
  $size?: NonNullable<IconConfig>["size"]
}

const iconSizes = {
  tiny: 1.6,
  small: 2.0,
  medium: 2.2,
  large: 3.2,
}

const StyledIcon = styled.div<IconConfigProps>`
  color: ${({ theme, $color }) => ($color ? theme.color[$color] : "inherit")};
  width: ${({ $size = "large" }) => iconSizes[$size]}rem;
  height: ${({ $size = "large" }) => iconSizes[$size]}rem;
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
    <StyledIcon
      data-testid={`icon-${iconType}`}
      $color={config?.color}
      $size={config?.size}
      {...rest}
    >
      <SVGToDisplay />
    </StyledIcon>
  )
}
