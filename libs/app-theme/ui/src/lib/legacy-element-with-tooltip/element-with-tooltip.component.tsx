/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ComponentProps,
  forwardRef,
  MouseEventHandler,
  ReactElement,
  useRef,
  useState,
  useLayoutEffect,
  FunctionComponent,
  PropsWithChildren,
  Ref,
} from "react"
import styled from "styled-components"
import _uniqueId from "lodash/uniqueId"
import { Tooltip } from "react-tooltip"

export enum ElementWithTooltipPlace {
  Bottom = "bottom",
  BottomStart = "bottom-start",
  BottomEnd = "bottom-end",
  TopStart = "top-start",
  TopLeft = "top-end",
}

interface ElementWithTooltipProps extends PropsWithChildren {
  Element: ReactElement
  place?: ElementWithTooltipPlace
  onClick?: MouseEventHandler
  showIfTextEllipsis?: boolean
  elementRef?: Ref<HTMLElement>
}

const CleanTooltip = styled(Tooltip)`
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;

  &::before,
  &::after {
    display: none !important;
  }
`

const ElementWithTooltip: FunctionComponent<ElementWithTooltipProps> = ({
  children,
  Element,
  place = ElementWithTooltipPlace.Bottom,
  onClick,
  showIfTextEllipsis = false,
  elementRef,
}) => {
  const [id] = useState(_uniqueId("tooltip-"))
  const ref = useRef<HTMLElement | null>(null)
  const [isEllipsis, setIsEllipsis] = useState(false)

  const handleOnClick: MouseEventHandler = (event) => {
    if (onClick) onClick(event)
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
      resizeObserver?.disconnect()
    }
  }, [ref, showIfTextEllipsis])

  const showTooltip = (showIfTextEllipsis && isEllipsis) || !showIfTextEllipsis

  return (
    <>
      {React.cloneElement(Element as React.ReactElement<any>, {
        ...(Element.props || {}),
        id,
        onClick: handleOnClick,
        "data-tooltip-id": id,
        ref: (node: HTMLElement) => {
          ref.current = node
          if (typeof elementRef === "function") {
            elementRef(node)
          } else if (elementRef && typeof elementRef === "object") {
            ;(
              elementRef as React.MutableRefObject<HTMLElement | null>
            ).current = node
          }
        },
      })}
      {showTooltip && (
        <CleanTooltip
          id={id}
          place={place}
          style={{ zIndex: 9999 }}
          delayShow={300}
        >
          {children}
        </CleanTooltip>
      )}
    </>
  )
}

export const LegacyElementWithTooltip = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof ElementWithTooltip>
>((props, ref) => <ElementWithTooltip {...props} elementRef={ref} />)
