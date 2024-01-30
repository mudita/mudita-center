/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectComponentData } from "generic-view/store"
import { RecursiveComponent } from "generic-view/utils"

export const withData = <P extends object>(
  Component: ComponentType<P & { viewKey?: string; componentKey: string }>
): RecursiveComponent => {
  return ({ viewKey, componentKey, ...props }) => {
    const data = useSelector((state: ReduxRootState) => {
      return selectComponentData(state, { viewKey, componentKey })
    })
    return (
      <Component
        {...(props as P)}
        data={data}
        componentKey={componentKey}
        viewKey={viewKey}
      />
    )
  }
}
