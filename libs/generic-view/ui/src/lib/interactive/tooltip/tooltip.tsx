/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react"
import { APIFC, BaseGenericComponent } from "generic-view/utils"
import styled from "styled-components"

export const Tooltip: APIFC & {
  Anchor: typeof TooltipAnchor
  Content: typeof TooltipContent
} = ({ children }) => {
  const [anchorPosition, setAnchorPosition] = useState<{
    top?: number
    left?: number
  }>({})

  const handleAnchorHover = useCallback((event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setAnchorPosition({ top: rect.top + rect.height, left: rect.left })
  }, [])

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
        $top: anchorPosition.top,
        $left: anchorPosition.left,
      })
    })
  }, [children, anchorPosition.left, anchorPosition.top])

  return (
    <>
      {anchor}
      {content}
    </>
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

const TooltipContent: BaseGenericComponent<
  undefined,
  undefined,
  { viewKey?: string; "data-tooltip-content"?: boolean }
> = ({ data, config, children, ...rest }) => {
  return <Content {...rest}>{children}</Content>
}

Tooltip.Content = TooltipContent
Tooltip.Content.defaultProps = {
  "data-tooltip-content": true,
}

const Content = styled.div<{ $top?: number; $left?: number }>`
  position: fixed;
  z-index: 2;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  ${({ $top }) => ($top ? `top: ${$top}px;` : "")}
  ${({ $left }) => ($left ? `left: ${$left}px;` : "")}
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
