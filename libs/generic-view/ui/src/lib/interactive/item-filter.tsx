/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useLayoutEffect, useRef } from "react"
import { APIFC } from "generic-view/utils"
import { ItemFilterConfig, ItemFilterData } from "generic-view/models"

export const ItemFilter: APIFC<ItemFilterData, ItemFilterConfig> = ({
  config,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current || config.variant !== "FirstNonEmpty") {
      return
    }

    const childNodes = Array.from(
      containerRef.current.children
    ) as HTMLElement[]
    let foundNonEmpty = false

    childNodes.forEach((childNode) => {
      const textContent = childNode.textContent ?? ""

      if (textContent.trim().length > 0 && !foundNonEmpty) {
        foundNonEmpty = true
      } else {
        childNode.style.display = "none"
      }
    })
  }, [children, config.variant])

  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      config.variant !== undefined ||
      !config.slice
    ) {
      return
    }

    const childNodes = Array.from(
      containerRef.current.children
    ) as HTMLElement[]
    const [start, end] = config.slice
    const slicedNodes = childNodes.slice(start, end)

    childNodes.forEach((childNode) => {
      if (!slicedNodes.includes(childNode)) {
        childNode.style.display = "none"
      }
    })
  }, [children, config.slice, config.variant])

  return <div ref={containerRef}>{children}</div>
}
