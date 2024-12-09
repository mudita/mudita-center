/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { SegmentBarConfig, SegmentBarData } from "generic-view/models"
import { computeSegmentBarItems } from "./compute-segment-bar-items.helper"
import { SegmentBarItem } from "./segment-bar-item"
import { useContainerWidth } from "./use-container-width.hook"

const mergeSegments = (
  data: SegmentBarData | undefined,
  config: SegmentBarConfig
): SegmentBarConfig["segments"] => {
  if (data?.segments.length !== config.segments.length) {
    return config.segments
  }

  return config.segments.map((segment, index) => {
    return {
      ...segment,
      value: data.segments[index],
    }
  })
}

export const SegmentBar: APIFC<SegmentBarData, SegmentBarConfig> = ({
  config,
  data,
  ...props
}) => {
  const { ref, containerWidth } = useContainerWidth()

  const segments = React.useMemo(() => {
    return mergeSegments(data, config)
  }, [data, config])

  const computedSegments = React.useMemo(() => {
    return computeSegmentBarItems(segments, containerWidth)
  }, [segments, containerWidth])

  return (
    <Wrapper ref={ref} width={"100%"} height={"14px"} {...props}>
      {computedSegments.map((segment, index) => (
        <SegmentBarItem key={index} {...segment} isFirst={index === 0} />
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
