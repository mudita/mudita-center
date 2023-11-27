/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { RecursiveLayout } from "./components/recursive-layout"

export const OverviewDemo: FunctionComponent = () => {
  const { layout, data } = useSelector((state: ReduxRootState) => state.generic)

  return (
    <RecursiveLayout
      component={layout.main.component}
      parameters={layout.main.parameters}
      childrenKeys={layout.main.childrenKeys}
    />
  )
}
