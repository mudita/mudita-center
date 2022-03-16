/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, ReactElement, useState } from "react"
import _uniqueId from "lodash/uniqueId"
import { TooltipProps } from "react-tooltip"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Tooltip from "Renderer/components/core/tooltip/tooltip.component"

export enum IconButtonWithTooltipPlace {
  Bottom = "bottom",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
}

interface Props {
  Element: ReactElement
  place?: IconButtonWithTooltipPlace
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

const ElementWithTooltip: FunctionComponent<Props> = ({
  children,
  className,
  place = IconButtonWithTooltipPlace.BottomRight,
  Element,
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
    <>
      {React.cloneElement(Element as ReactElement, {
        "data-tip": true,
        "data-for": id,
        ...props,
      })}
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
    </>
  )
}

export default ElementWithTooltip
