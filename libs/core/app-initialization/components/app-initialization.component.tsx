/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { setAppInitializationStatus } from "Core/app-initialization/actions/base.action"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"

const AppInitialization: FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAppInitializationStatus(AppInitializationStatus.Initializing))
  }, [dispatch])

  return <div>App Initialization View</div>
}

export default AppInitialization
