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
import { TooltipPlacement } from "device/models"

export const Tooltip: BaseGenericComponent<
  undefined,
  undefined,
  { placement?: TooltipPlacement }
> & {
  Anchor: typeof TooltipAnchor
  Content: typeof TooltipContent
} = ({ children, placement = "bottom-right" }) => {
  const [anchorPosition, setAnchorPosition] = useState<{
    top?: number
    left?: number
  }>({})

  const contentRef = useRef<HTMLDivElement>(null)

  const handleAnchorHover = useCallback(
    (event: MouseEvent) => {
      const anchorRect = event.currentTarget.getBoundingClientRect()
      const contentReact = contentRef.current?.getBoundingClientRect()

      if (contentReact === undefined) {
        return
      }

      if (placement === "bottom-right") {
        const top = anchorRect.top + anchorRect.height
        const left = anchorRect.left

        setAnchorPosition({ left, top })
      } else if (placement === "bottom-left") {
        const top = anchorRect.top + anchorRect.height
        const left = anchorRect.left - contentReact.width + anchorRect.width

        setAnchorPosition({ left, top })
      }
    },
    [placement]
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
        $top: anchorPosition.top,
        $left: anchorPosition.left,
        ref: contentRef,
        $placement: placement,
      })
    })
  }, [children, anchorPosition.top, anchorPosition.left, placement])

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
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: ${theme.space.xs} ${theme.space.sm};
      background-color: ${theme.color.grey4};
      border-radius: ${theme.radius.sm};
      box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);

      && > p {
        width: 100%;
        color: ${theme.color.black};
        white-space: pre-wrap;
        text-align: ${$placement === "bottom-left" ? "right" : "left"};
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
