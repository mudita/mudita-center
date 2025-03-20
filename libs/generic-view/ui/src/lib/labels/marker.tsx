/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { MarkerConfig } from "generic-view/models"

export const Marker: APIFC<undefined, MarkerConfig> = ({
  config,
  data,
  ...props
}) => {
  return <Wrapper $color={config.color} {...props} />
}

const Wrapper = styled.div<{ $color: string }>`
  display: inline-block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`
