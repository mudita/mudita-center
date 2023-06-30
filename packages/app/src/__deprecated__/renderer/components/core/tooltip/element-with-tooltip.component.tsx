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
  useLayoutEffect,
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
  TopRight = "top-right",
}

interface Props {
  Element: ReactElement
  place?: ElementWithTooltipPlace
  offset?: TooltipProps["offset"]
  onClick?: MouseEventHandler
  showIfTextEllipsis?: boolean
  threadsOffset?: { left: number; top: number }
}

const topOffset = 5

const overridePosition =
  (
    place: Props["place"],
    threadsOffset: Props["threadsOffset"]
  ): TooltipProps["overridePosition"] =>
  ({ left, top }, _, triggerElement, tooltipElement) => {
    const trigger = triggerElement as HTMLElement
    const tooltip = tooltipElement as HTMLElement
    let result: { left: number; top: number } = { left: 0, top: 0 }

    if (place === ElementWithTooltipPlace.BottomRight) {
      const arrowLeft = trigger.getBoundingClientRect().left
      const arrowTop =
        trigger.getBoundingClientRect().top + trigger.offsetHeight + topOffset

      result = { left: arrowLeft, top: arrowTop }
    } else if (place === ElementWithTooltipPlace.BottomLeft) {
      const arrowLeft =
        trigger.getBoundingClientRect().left -
        tooltip.offsetWidth +
        trigger.offsetWidth
      const arrowTop =
        trigger.getBoundingClientRect().top + trigger.offsetHeight + topOffset

      result = { left: arrowLeft, top: arrowTop }
    } else if (place === ElementWithTooltipPlace.TopLeft) {
      const arrowLeft =
        trigger.getBoundingClientRect().left -
        tooltip.offsetWidth +
        trigger.offsetWidth

      const arrowTop =
        trigger.getBoundingClientRect().top - tooltip.offsetHeight - topOffset

      result = { left: arrowLeft, top: arrowTop }
    } else if (place === ElementWithTooltipPlace.TopRight) {
      const arrowLeft = trigger.getBoundingClientRect().left

      const arrowTop =
        trigger.getBoundingClientRect().top - tooltip.offsetHeight - topOffset

      result = { left: arrowLeft, top: arrowTop }
    } else {
      result = { left, top }
    }

    return includeThreadsOffsetToPosition(result, threadsOffset)
  }

const includeThreadsOffsetToPosition = (
  position: { left: number; top: number },
  threadsOffset: Props["threadsOffset"]
) => {
  if (position && threadsOffset) {
    return {
      left: position.left - threadsOffset.left,
      top: position.top - threadsOffset.top,
    }
  } else {
    return position
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
  showIfTextEllipsis = false,
  threadsOffset,
  ...props
}) => {
  const [id] = useState(_uniqueId("prefix-"))
  const ref = useRef<Element | HTMLDivElement>(null)
  const [isEllipsis, setIsEllipsis] = useState(false)

  // FIXME: a sticky option workaround for `ThreadRow` component
  const tooltipProps: Partial<ComponentProps<typeof Tooltip>> = offset
    ? {
        offset,
        place: "bottom",
      }
    : {
        overridePosition: overridePosition(place, threadsOffset),
      }
  const handleOnClick: MouseEventHandler = (event) => {
    if (onClick) {
      onClick(event)
    }
    if (ref.current !== null) {
      Tooltip.hide(ref.current)
    }
  }

  useLayoutEffect(() => {
    const trigger = () => {
      const text = ref.current as HTMLDivElement
      const isEllipsisActive = text && text.offsetWidth < text.scrollWidth
      setIsEllipsis(isEllipsisActive)
    }

    let resizeObserver: ResizeObserver | undefined

    if (showIfTextEllipsis && ref.current) {
      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(trigger)
        resizeObserver.observe(ref.current)
      }

      trigger()
    }

    return () => {
      resizeObserver && resizeObserver.disconnect()
    }
  }, [ref, showIfTextEllipsis])

  const showTooltip = (showIfTextEllipsis && isEllipsis) || !showIfTextEllipsis
  return (
    <>
      {React.cloneElement(Element, {
        "data-tip": true,
        "data-for": id,
        onClick: handleOnClick,
        ref: ref,
        "data-event": "mouseenter",
        "data-event-off": "mouseleave focusout",
        ...props,
      })}
      {showTooltip && (
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
      )}
    </>
  )
}

export default ElementWithTooltip
