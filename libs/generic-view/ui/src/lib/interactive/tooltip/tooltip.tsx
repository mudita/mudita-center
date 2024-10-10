/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  forwardRef,
  useRef,
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react"
import styled, { css } from "styled-components"
import { BaseGenericComponent } from "generic-view/utils"
import { TooltipOffsetType, TooltipPlacement } from "device/models"
import {
  flipHorizontal,
  flipTooltipPlacement,
  flipVertical,
  getFlipStatus,
} from "./tooltip-helpers"

interface Position {
  left: number
  top: number
}

export const Tooltip: BaseGenericComponent<
  undefined,
  undefined,
  { placement?: TooltipPlacement; offset?: TooltipOffsetType }
> & {
  Anchor: typeof TooltipAnchor
  Content: typeof TooltipContent
} = ({ children, placement = "bottom-right", offset = { x: 0, y: 0 } }) => {
  const [contentPosition, setContentPosition] = useState<Partial<Position>>({})
  const originalPlacement = useRef<TooltipPlacement>(placement)

  const contentRef = useRef<HTMLDivElement>(null)

  const handleAnchorHover = useCallback(
    (event: MouseEvent) => {
      const anchorRect = event.currentTarget.getBoundingClientRect()
      const contentRect = contentRef.current?.getBoundingClientRect()

      if (!contentRect) return

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const placements: TooltipPlacement[] = [
        placement,
        flipVertical(placement),
        flipHorizontal(placement),
        flipTooltipPlacement(placement),
      ]

      const calculatePosition = (placement: TooltipPlacement): Position => {
        let top = 0
        let left = 0

        const adjustedOffset: TooltipOffsetType = { ...offset }
        const { isFlippedVertically, isFlippedHorizontally } = getFlipStatus(
          originalPlacement.current,
          placement
        )

        if (isFlippedVertically) {
          adjustedOffset.y = -offset.y
        }
        if (isFlippedHorizontally) {
          adjustedOffset.x = -offset.x
        }

        switch (placement) {
          case "bottom-right":
            top = anchorRect.top + anchorRect.height + adjustedOffset.y
            left = anchorRect.left + adjustedOffset.x
            break
          case "bottom-left":
            top = anchorRect.top + anchorRect.height + adjustedOffset.y
            left =
              anchorRect.left -
              contentRect.width +
              anchorRect.width +
              adjustedOffset.x
            break
          case "top-right":
            top = anchorRect.top + adjustedOffset.y - contentRect.height
            left = anchorRect.left + adjustedOffset.x
            break
          case "top-left":
            top = anchorRect.top + adjustedOffset.y - contentRect.height
            left =
              anchorRect.left -
              contentRect.width +
              anchorRect.width +
              adjustedOffset.x
            break
        }

        return { top, left }
      }

      const isWithinViewport = (position: Position): boolean => {
        return (
          position.left >= 0 &&
          position.top >= 0 &&
          position.left + contentRect.width <= viewportWidth &&
          position.top + contentRect.height <= viewportHeight
        )
      }

      for (const placement of placements) {
        const position = calculatePosition(placement)
        if (isWithinViewport(position)) {
          setContentPosition(position)
          return
        }
      }

      const position = calculatePosition(placement)
      setContentPosition(position)
    },
    [placement, offset]
  )

  const anchor = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null
      }
      if (!child.props["data-tooltip-anchor"]) {
        return null
      }
      return React.cloneElement(child as ReactElement, {
        onMouseEnter: (event: MouseEvent) => {
          child.props.onMouseEnter && child.props.onMouseEnter(event)
          handleAnchorHover(event)
        },
      })
    })
  }, [children, handleAnchorHover])

  const content = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null
      }
      if (!child.props["data-tooltip-content"]) {
        return null
      }
      return React.cloneElement(child as ReactElement, {
        ...child.props,
        $top: contentPosition.top,
        $left: contentPosition.left,
        ref: contentRef,
        $placement: placement,
      })
    })
  }, [children, contentPosition.top, contentPosition.left, placement])

  return (
    <Container>
      {anchor}
      {content}
    </Container>
  )
}

export default Tooltip

const TooltipAnchor: BaseGenericComponent<
  undefined,
  undefined,
  { viewKey?: string; "data-tooltip-anchor"?: boolean }
> = ({ data, config, children, ...rest }) => {
  return <Anchor {...rest}>{children}</Anchor>
}

Tooltip.Anchor = TooltipAnchor
Tooltip.Anchor.defaultProps = {
  "data-tooltip-anchor": true,
}

const TooltipContent = forwardRef<
  HTMLDivElement,
  {
    viewKey?: string
    "data-tooltip-content"?: boolean
    $defaultStyles?: boolean
    $placement?: TooltipPlacement
    children: React.ReactNode
  }
>(({ children, ...rest }, ref) => {
  return (
    <Content ref={ref} {...rest}>
      {children}
    </Content>
  )
})

Tooltip.Content = TooltipContent
Tooltip.Content.defaultProps = {
  "data-tooltip-content": true,
}

const Container = styled.div`
  display: inline-block;
`

const Content = styled.div<{
  $top?: number
  $left?: number
  $placement?: TooltipPlacement
  $defaultStyles?: boolean
}>`
  position: fixed;
  z-index: 2;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  ${({ $top }) => ($top ? `top: ${$top}px;` : "")}
  ${({ $left }) => ($left ? `left: ${$left}px;` : "")}

  ${({ $defaultStyles, theme, $placement }) =>
    $defaultStyles &&
    css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: ${theme.space.xs} ${theme.space.sm};
      background-color: ${theme.color.grey4};
      border-radius: ${theme.radius.sm};
      box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);

      && > p {
        width: 100%;
        color: ${theme.color.grey1};
        white-space: pre-wrap;
        text-align: ${$placement === "bottom-left" || $placement === "top-left"
          ? "right"
          : "left"};
      }
    `}
`

const Anchor = styled.div`
  cursor: pointer;
  &:hover {
    + ${Content} {
      visibility: visible;
      opacity: 1;
    }
  }
`
