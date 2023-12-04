/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import { APIFC } from "../../models/api-fc.types"
import { useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

export const withData = <P extends object>(
  Component: ComponentType<P & { data?: unknown }>
): APIFC<P, unknown, { viewKey: string; dataKey: string }> => {
  return ({ viewKey, dataKey, ...props }) => {
    const view = useSelector(
      (state: ReduxRootState) => state.generic.views[viewKey]
    )
    const data = view?.data?.[dataKey] || {}
    return (
      <Component test-id={`${dataKey}-data`} {...(props as P)} data={data} />
    )
  }
}
