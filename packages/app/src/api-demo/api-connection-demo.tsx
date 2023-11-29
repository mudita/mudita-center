/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { RecursiveLayout } from "./components/recursive-layout"
import { getAPIConfig } from "./store/actions/get-api-config.action"

export const APIConnectionDemo: FunctionComponent = () => {
  const { layout, data } = useSelector((state: ReduxRootState) => state.generic)
  const dispatch = useDispatch<any>()

  return (
    <div>
      <button
        onClick={() => {
          dispatch(getAPIConfig())
        }}
      >
        get api config
      </button>
    </div>
  )
}
