/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { computeSegmentBarItems } from "./compute-segment-bar-items.helper"
import { useContainerWidth } from "./use-container-width.hook"
import { SegmentBarItem } from "./segment-bar-item"
import { ISegmentBarItem } from "./segment-bar.types"

interface Props {
  segments: ISegmentBarItem[]
}

export const SegmentBar: FunctionComponent<Props> = ({
  segments,
  ...props
}) => {
  const { ref, containerWidth } = useContainerWidth()

  const computedSegments = React.useMemo(() => {
    return computeSegmentBarItems(segments, containerWidth)
  }, [segments, containerWidth])

  return (
    <Wrapper
      data-tooltip-boundary
      ref={ref}
      width={"100%"}
      height={"14px"}
      {...props}
    >
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
  z-index: 2;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`
