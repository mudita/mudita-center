/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType, withConfig } from "generic-view/utils"
import { APIFC } from "generic-view/utils"
import React from "react"
import styled from "styled-components"
import { getIcon } from "./get-icon.helper"

interface IconProps {
  type: IconType
}

const StyledIcon = styled.div`
  color: pink;
  width: 3.2rem;
  height: 3.2rem;
  & > * {
    width: 100%;
    height: 100%;
  }
`

export const Icon: APIFC<IconProps, IconProps> = ({
  className,
  data,
  config,
  ...rest
}) => {
  if (!data && !config) {
    return null
  }
  const type = data?.type || config?.type

  const SVGToDisplay = getIcon(type!)

  return (
    <StyledIcon className={className} data-testid={`icon-${type}`} {...rest}>
      <SVGToDisplay />
    </StyledIcon>
  )
}

export default withConfig(Icon)
