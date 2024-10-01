/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useLayoutEffect, useRef } from "react"
import { APIFC } from "generic-view/utils"
import { ItemFilterConfig, ItemFilterData } from "generic-view/models"

export const ItemFilter: APIFC<ItemFilterData, ItemFilterConfig> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return
    }

    const childNodes = Array.from(
      containerRef.current.children
    ) as HTMLElement[]
    let foundNonEmpty = false

    childNodes.forEach((childNode) => {
      const textContent = childNode.textContent ?? ""

      if (textContent.trim().length > 0 && !foundNonEmpty) {
        childNode.style.display = "block"
        foundNonEmpty = true
      } else {
        childNode.style.display = "none"
      }
    })
  }, [children])

  return <div ref={containerRef}>{children}</div>
}
