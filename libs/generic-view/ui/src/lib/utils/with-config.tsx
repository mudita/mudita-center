/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { RecursiveComponent } from "generic-view/utils"
import { selectComponentConfig } from "generic-view/store"

export const withConfig = <P extends object>(
  Component: ComponentType<P & { viewKey?: string; componentKey: string }>
): RecursiveComponent => {
  return ({ viewKey, componentKey, ...props }) => {
    const config = useSelector((state: ReduxRootState) => {
      return selectComponentConfig(state, { viewKey, componentKey })
    })
    return (
      <Component
        {...(props as P)}
        config={config}
        componentKey={componentKey}
        viewKey={viewKey}
      />
    )
  }
}
