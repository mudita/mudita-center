/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "generic-view/utils"
import { APIFC } from "generic-view/utils"
import React from "react"
import styled from "styled-components"
import { getIcon } from "./get-icon.helper"

interface IconProps {
  type: IconType
}

const StyledIcon = styled.div`
  color: pink;
  width: 32px;
  height: 32px;
  & > * {
    width: 100%;
    height: 100%;
  }
`

const Icon: APIFC<IconProps> = ({ className, data, ...rest }) => {
  if (!data) {
    return null
  }

  const SVGToDisplay = getIcon(data.type)

  return (
    <StyledIcon
      className={className}
      data-testid={`icon-${data.type}`}
      {...rest}
    >
      <SVGToDisplay />
    </StyledIcon>
  )
}

export default Icon
