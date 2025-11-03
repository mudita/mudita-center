/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  createContext,
  CSSProperties,
  FunctionComponent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useContext,
  useId,
  useMemo,
} from "react"
import styled from "styled-components"
import { createPortal } from "react-dom"

const TooltipContext = createContext<{
  onAnchorHover: (event: MouseEvent) => void
  onAnchorLeave: () => void
}>({
  onAnchorHover: () => {
    return
  },
  onAnchorLeave: () => {
    return
  },
})

interface Props extends PropsWithChildren {
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  strategy?: "element-oriented" | "cursor" | "cursor-horizontal"
  offset?: {
    x: number
    y: number
  }
  className?: string
  style?: CSSProperties
}

export const Tooltip: FunctionComponent<Props> & {
  Anchor: typeof TooltipAnchor
  Content: typeof TooltipContent
} = ({ children, ...props }) => {
  const uid = useId()
  const tooltipPortal = document.getElementById("tooltip-portal")

  const {
    placement = "bottom-right",
    strategy = "element-oriented",
    offset = {
      x: 0,
      y: 0,
    },
  } = props || {}

  const handleAnchorHover = useCallback(
    (event: MouseEvent) => {
      const [placementVertical, placementHorizontal] = placement.split("-")
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const anchorRect = event.currentTarget.getBoundingClientRect()
      const content = tooltipPortal?.querySelector(
        `[data-tooltip-id=${uid}]`
      ) as HTMLDivElement

      if (!content) return

      content.style.visibility = "visible"
      content.style.opacity = "1"

      const contentRect = content.getBoundingClientRect()

      const top = anchorRect.bottom + offset.y
      const bottom = viewportHeight - anchorRect.top + offset.y
      const left = anchorRect.right + offset.x - anchorRect.width
      const right =
        viewportWidth - anchorRect.left + offset.x - anchorRect.width

      const moveToTop = () => {
        content.style.top = ""
        content.style.bottom = `${bottom}px`
      }

      const moveToBottom = () => {
        content.style.top = `${top}px`
        content.style.bottom = ""
      }

      const moveToRight = () => {
        content.style.left = `${left}px`
        content.style.right = ""
      }

      const moveToLeft = () => {
        content.style.left = ""
        content.style.right = `${right}px`
      }

      const updateTooltipPosition = () => {
        const boundaryElement = event.currentTarget.closest(
          "[data-tooltip-boundary]"
        ) as HTMLElement
        const boundary = boundaryElement?.getBoundingClientRect()

        const viewportWidth = boundary?.width || window.innerWidth
        const viewportHeight = boundary?.height || window.innerHeight
        const viewportTop = boundary?.top || 0
        const viewportLeft = boundary?.left || 0
        const cursorY = event.clientY + offset.y
        const cursorX = event.clientX + offset.x

        const adjustedY = Math.min(
          Math.max(cursorY, viewportTop),
          viewportTop + viewportHeight - contentRect.height
        )

        const adjustedX = Math.min(
          Math.max(cursorX, viewportLeft),
          viewportLeft + viewportWidth - contentRect.width
        )

        content.style.top = `${adjustedY}px`
        content.style.left = `${adjustedX}px`
        content.style.right = ""
        content.style.bottom = ""
      }

      const updateTooltipPositionX = () => {
        switch (placementVertical) {
          case "top":
            bottom - contentRect.height > 0 ? moveToTop() : moveToBottom()
            break
          case "bottom":
            top + contentRect.height < viewportHeight
              ? moveToBottom()
              : moveToTop()
            break
        }

        const boundaryElement = event.currentTarget.closest(
          "[data-tooltip-boundary]"
        ) as HTMLElement
        const boundary = boundaryElement?.getBoundingClientRect()

        const viewportWidth = boundary?.width || window.innerWidth
        const viewportLeft = boundary?.left || 0
        const cursorX = event.clientX + offset.x

        const adjustedX = Math.min(
          Math.max(cursorX, viewportLeft),
          viewportLeft + viewportWidth - contentRect.width
        )

        content.style.left = `${adjustedX}px`
        content.style.right = ""
      }

      const applyElementPositioning = () => {
        switch (placementVertical) {
          case "top": {
            bottom - contentRect.height > 0 ? moveToTop() : moveToBottom()
            break
          }
          case "bottom": {
            top + contentRect.height < viewportHeight
              ? moveToBottom()
              : moveToTop()
            break
          }
        }

        switch (placementHorizontal) {
          case "left":
            viewportWidth - right - contentRect.width > 0
              ? moveToLeft()
              : moveToRight()
            break
          case "right":
            left + contentRect.width < viewportWidth
              ? moveToRight()
              : moveToLeft()
            break
        }
      }

      if (strategy === "cursor") {
        updateTooltipPosition()
      } else if (strategy === "cursor-horizontal") {
        updateTooltipPositionX()
      } else {
        applyElementPositioning()
      }
    },
    [offset.x, offset.y, placement, strategy, tooltipPortal, uid]
  )

  const handleAnchorLeave = useCallback(() => {
    const content = tooltipPortal?.querySelector(
      `[data-tooltip-id=${uid}]`
    ) as HTMLDivElement

    if (!content) return

    content.style.visibility = "hidden"
    content.style.opacity = "0"
  }, [tooltipPortal, uid])

  const anchor = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Tooltip.Anchor) {
        return child
      }
      return null
    })
  }, [children])

  const content = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (
        React.isValidElement<{ ["data-tooltip-id"]: string }>(child) &&
        child.type === Tooltip.Content
      ) {
        return React.cloneElement(child, {
          "data-tooltip-id": uid,
        })
      }
      return null
    })
  }, [children, uid])

  return (
    <TooltipContext.Provider
      value={{
        onAnchorHover: handleAnchorHover,
        onAnchorLeave: handleAnchorLeave,
      }}
    >
      <Container {...props}>
        {anchor}
        {tooltipPortal && createPortal(content, tooltipPortal)}
      </Container>
    </TooltipContext.Provider>
  )
}

export default Tooltip

const TooltipAnchor: FunctionComponent<PropsWithChildren> = ({
  children,
  ...rest
}) => {
  const { onAnchorHover, onAnchorLeave } = useContext(TooltipContext)
  return (
    <Anchor {...rest} onMouseEnter={onAnchorHover} onMouseLeave={onAnchorLeave}>
      {children}
    </Anchor>
  )
}
Tooltip.Anchor = TooltipAnchor

const TooltipContent: FunctionComponent<PropsWithChildren> = ({
  children,
  ...rest
}) => {
  return <Content {...rest}>{children}</Content>
}
Tooltip.Content = TooltipContent

const Container = styled.div`
  display: inline-block;
  position: relative;
`

const Content = styled.div`
  position: fixed;
  z-index: 2;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  padding: ${({ theme }) => `${theme.app.space.xxs} ${theme.app.space.sm}`};
  background-color: ${({ theme }) => theme.app.color.grey4};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);
`

const Anchor = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`
