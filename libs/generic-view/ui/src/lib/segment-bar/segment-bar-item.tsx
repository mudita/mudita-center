/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { ComputedSegmentBarItem } from "./compute-segment-bar-items.helper"
import { BaseGenericComponent } from "generic-view/utils"

interface SegmentBarItemProps extends ComputedSegmentBarItem {
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
  isFirst: boolean
}>`
  position: absolute;
  height: 100%;
  border-radius: ${(props) => (props.isFirst ? `56px` : `0 56px 56px 0`)};
`
