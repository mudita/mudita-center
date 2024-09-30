/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { APIFC } from "generic-view/utils"
import { ListRendererConfig, ListRendererData } from "generic-view/models"

export const ListRenderer: APIFC<ListRendererData, ListRendererConfig> = ({
  children,
}) => {
  useEffect(() => {
    console.log("Props children:", children)

    React.Children.forEach(children, (child) => {
      if (child && typeof child === "object" && "props" in child) {
        console.log("Element props:", child.props)
      } else {
        console.log("Non-React element:", child)
      }
    })
  }, [children])

  return <>{children}</>
}
