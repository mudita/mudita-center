/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { BaseGenericComponent } from "generic-view/utils"
import { Tooltip } from "../interactive/tooltip/tooltip"
import { Typography } from "../typography"
import { ComputedSegmentBarItem } from "./compute-segment-bar-items.helper"

interface SegmentBarItemProps extends ComputedSegmentBarItem {
  isFirst: boolean
}

export const SegmentBarItem: BaseGenericComponent<
  undefined,
  undefined,
  SegmentBarItemProps
> = React.memo(({ color, width, left, zIndex, label, ...props }) => (
  <TooltipStyled
    config={{
      placement: "bottom-right",
      strategy: "cursor-horizontal",
      offset: { x: 0, y: 9 },
    }}
    style={{
      width,
      left,
      zIndex,
      backgroundColor: color,
    }}
    {...props}
  >
    <Tooltip.Content>
      <Typography.P5 config={{ color: "grey1" }}>{label}</Typography.P5>
    </Tooltip.Content>
    <Tooltip.Anchor />
  </TooltipStyled>
))

const TooltipStyled = styled(Tooltip)<{
  isFirst: boolean
}>`
  position: absolute;
  display: block;
  height: 100%;
  border-radius: ${(props) => (props.isFirst ? `56px` : `0 56px 56px 0`)};
`
