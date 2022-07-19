/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ComponentProps,
  MouseEventHandler,
  ReactElement,
  useRef,
  useState,
} from "react"
import _uniqueId from "lodash/uniqueId"
import { TooltipProps } from "react-tooltip"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Tooltip from "App/__deprecated__/renderer/components/core/tooltip/tooltip.component"

export enum ElementWithTooltipPlace {
  Bottom = "bottom",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  TopLeft = "top-left",
}

interface Props {
  Element: ReactElement
  place?: ElementWithTooltipPlace
  offset?: TooltipProps["offset"]
  onClick?: MouseEventHandler
}

const overridePosition =
  (place: Props["place"]): TooltipProps["overridePosition"] =>
  ({ left, top }, event, triggerElement, tooltipElement) => {
    if (place === ElementWithTooltipPlace.BottomRight) {
      const arrowLeft = (triggerElement as HTMLElement).getBoundingClientRect()
        .left
      const arrowTop =
        (triggerElement as HTMLElement).getBoundingClientRect().top +
        (triggerElement as HTMLElement).offsetHeight +
        5

      return { left: arrowLeft, top: arrowTop }
    } else if (place === ElementWithTooltipPlace.BottomLeft) {
      const arrowLeft =
        (triggerElement as HTMLElement).getBoundingClientRect().left -
        (tooltipElement as HTMLElement).offsetWidth +
        (triggerElement as HTMLElement).offsetWidth
      const arrowTop =
        (triggerElement as HTMLElement).getBoundingClientRect().top +
        (triggerElement as HTMLElement).offsetHeight +
        5

      return { left: arrowLeft, top: arrowTop }
    } else if (place === ElementWithTooltipPlace.TopLeft) {
      const arrowLeft =
        (triggerElement as HTMLElement).getBoundingClientRect().left -
        (tooltipElement as HTMLElement).offsetWidth +
        (triggerElement as HTMLElement).offsetWidth

      const arrowTop =
        (triggerElement as HTMLElement).getBoundingClientRect().top -
        (tooltipElement as HTMLElement).offsetHeight -
        5

      return { left: arrowLeft, top: arrowTop }
    } else {
      return { left, top }
    }
  }

const ElementWithTooltip: FunctionComponent<Props> = ({
  children,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className,
  place = ElementWithTooltipPlace.BottomRight,
  Element,
  offset,
  onClick,
  ...props
}) => {
  const [id] = useState(_uniqueId("prefix-"))
  const ref = useRef<Element>(null)

  // FIXME: a sticky option workaround for `ThreadRow` component
  const tooltipProps: Partial<ComponentProps<typeof Tooltip>> = offset
    ? {
        offset,
        place: "bottom",
      }
    : {
        overridePosition: overridePosition(place),
      }
  const handleOnClick: MouseEventHandler = (event) => {
    if (onClick) {
      onClick(event)
    }
    if (ref.current !== null) {
      Tooltip.hide(ref.current)
    }
  }

  return (
    <>
      {React.cloneElement(Element, {
        "data-tip": true,
        "data-for": id,
        onClick: handleOnClick,
        ref: ref,
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
