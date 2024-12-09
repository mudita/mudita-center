/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { SegmentBarConfig } from "generic-view/models"
import { computeSegmentBarItems } from "./compute-segment-bar-items.helper"
import { SegmentBarItem } from "./segment-bar-item"
import { useContainerWidth } from "./use-container-width.hook"

export const SegmentBar: APIFC<undefined, SegmentBarConfig> = ({
  config,
  data,
  ...props
}) => {
  const { ref, containerWidth } = useContainerWidth()

  const computeSegments = React.useCallback(() => {
    return computeSegmentBarItems(config.segments, containerWidth)
  }, [config.segments, containerWidth])

  const computedSegments = computeSegments()

  const segmentBorderRadius = config.segmentBorderRadius || "56px"

  return (
    <Wrapper ref={ref} width={"100%"} height={"14px"} {...props}>
      {computedSegments.map((segment, index) => (
        <SegmentBarItem
          key={index}
          {...segment}
          borderRadius={segmentBorderRadius}
          isFirst={index === 0}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  width: string
  height: string
}>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`
