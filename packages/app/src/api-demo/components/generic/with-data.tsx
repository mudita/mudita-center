/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { RecursiveComponent } from "../../models/api-fc.types"
import { useSelector } from "react-redux"

export const withData = <P extends object>(
  Component: ComponentType<P>
): RecursiveComponent => {
  return ({ viewKey, componentKey, ...props }) => {
    const view = useSelector(
      (state: ReduxRootState) => state.generic.views[viewKey]
    )
    const data = view?.data?.[componentKey]
    return <Component {...(props as P)} data={data} />
  }
}
