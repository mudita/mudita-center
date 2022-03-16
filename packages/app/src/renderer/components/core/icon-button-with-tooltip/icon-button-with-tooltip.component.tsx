/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, useState } from "react"
import styled from "styled-components"
import _uniqueId from "lodash/uniqueId"
import { TooltipProps } from "react-tooltip"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"
import Tooltip from "Renderer/components/core/tooltip/tooltip.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { IconButtonWithTooltipTestIds } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-tooltip.enum"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

const IconButton = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly,
}))``

export enum IconButtonWithTooltipPlace {
  Bottom = "bottom",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
}

interface Props
  extends Omit<
    ComponentProps<typeof ButtonComponent>,
    "children" | "displayStyle"
  > {
  place?: IconButtonWithTooltipPlace
  iconType?: Type
  offset?: TooltipProps["offset"]
}

const overridePosition =
  (place: Props["place"]): TooltipProps["overridePosition"] =>
  ({ left, top }, event, triggerElement, tooltipElement) => {
    if (place === IconButtonWithTooltipPlace.BottomRight) {
      const arrowLeft = (triggerElement as HTMLElement).getBoundingClientRect()
        .left
      const arrowTop =
        (triggerElement as HTMLElement).getBoundingClientRect().top +
        (triggerElement as HTMLElement).offsetHeight +
        15

      return { left: arrowLeft, top: arrowTop }
    } else if (place === IconButtonWithTooltipPlace.BottomLeft) {
      const arrowLeft =
        (triggerElement as HTMLElement).getBoundingClientRect().left -
        (tooltipElement as HTMLElement).offsetWidth +
        (triggerElement as HTMLElement).offsetWidth
      const arrowTop =
        (triggerElement as HTMLElement).getBoundingClientRect().top +
        (triggerElement as HTMLElement).offsetHeight +
        15

      return { left: arrowLeft, top: arrowTop }
    } else {
      return { left, top }
    }
  }

const IconButtonWithTooltip: FunctionComponent<Props> = ({
  iconType = Type.Tooltip,
  children,
  className,
  place = IconButtonWithTooltipPlace.BottomRight,
  iconSize = IconSize.Medium,
  offset,
  ...props
}) => {
  const [id] = useState(_uniqueId("prefix-"))

  // FIXME: a sticky option workaround for `ThreadRow` component
  const tooltipProps: Partial<ComponentProps<typeof Tooltip>> = offset
    ? {
        offset,
        place: "bottom",
      }
    : {
        overridePosition: overridePosition(place),
      }

  return (
    <div>
      <IconButton
        data-tip
        data-for={id}
        Icon={iconType}
        data-testid={IconButtonWithTooltipTestIds.Icon}
        className={className}
        iconSize={iconSize}
        {...props}
      />
      <Tooltip
        id={id}
        effect="solid"
        data-border={false}
        arrowColor="transparent"
        backgroundColor={"transparent"}
        {...tooltipProps}
      >
        {children}
      </Tooltip>
    </div>
  )
}

export default IconButtonWithTooltip
