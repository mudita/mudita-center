/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { ComputedSegmentBarItem } from "./compute-segment-bar-items.helper"
import { BaseGenericComponent } from "generic-view/utils"

interface SegmentBarItemProps extends ComputedSegmentBarItem {
  borderRadius: string
  isFirst: boolean
}

export const SegmentBarItem: BaseGenericComponent<
  undefined,
  undefined,
  SegmentBarItemProps
> = React.memo(({ color, width, left, zIndex, label, ...props }) => (
  <Wrapper
    style={{
      width,
      left,
      zIndex,
      backgroundColor: color,
    }}
    {...props}
  />
))

const Wrapper = styled.div<{
  borderRadius: string
  isFirst: boolean
}>`
  position: absolute;
  height: 100%;
  border-radius: ${(props) =>
    props.isFirst
      ? `${props.borderRadius}`
      : `0 ${props.borderRadius} ${props.borderRadius} 0`};
`
