/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
} from "react"
import styled from "styled-components"
import { APIFC } from "generic-view/utils"
import { TooltipConfig } from "generic-view/models"

export const Tooltip: APIFC<undefined, TooltipConfig> & {
  Anchor: typeof TooltipAnchor
  Content: typeof TooltipContent
} = ({ children, config }) => {
  const {
    placement = "bottom-right",
    offset = {
      x: 0,
      y: 0,
    },
  } = config || {}

  const handleAnchorHover = useCallback(
    (event: MouseEvent) => {
      const [placementVertical, placementHorizontal] = placement.split("-")
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const anchorRect = event.currentTarget.getBoundingClientRect()
      const content = event.currentTarget.nextElementSibling as HTMLDivElement

      if (!content) return

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
    },
    [offset, placement]
  )

  const anchor = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (
        isValidElement(child) &&
        (child.props.componentName === "tooltip.anchor" ||
          child.type === Tooltip.Anchor)
      ) {
        return cloneElement(child as ReactElement, {
          onMouseEnter: (event: MouseEvent) => {
            child.props.onMouseEnter?.(event)
            handleAnchorHover(event)
          },
        })
      }
      return null
    })
  }, [children, handleAnchorHover])

  const content = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (
        isValidElement(child) &&
        (child.props.componentName === "tooltip.content" ||
          child.type === Tooltip.Content)
      ) {
        return cloneElement(child as ReactElement)
      }
      return null
    })
  }, [children])

  return (
    <Container>
      {anchor}
      {content}
    </Container>
  )
}

export default Tooltip

const TooltipAnchor: APIFC = ({ data, config, children, ...rest }) => {
  return <Anchor {...rest}>{children}</Anchor>
}
Tooltip.Anchor = TooltipAnchor

const TooltipContent: APIFC = ({ children, ...rest }) => {
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
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.sm}`};
  background-color: ${({ theme }) => theme.color.grey4};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);
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
