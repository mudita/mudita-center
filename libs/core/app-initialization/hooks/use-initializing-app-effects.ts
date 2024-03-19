/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startInitializingApp } from "Core/app-initialization/actions/start-initializing-app"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setAppInitializationStatus } from "Core/app-initialization/actions/base.action"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"
import { isAppInitializationFinishedSelector } from "Core/app-initialization/selectors/is-app-initialization-finished.selector"

export const useInitializingAppEffects = () => {
  const dispatch = useDispatch<Dispatch>()
  const appInitializationFinished = useSelector(
    isAppInitializationFinishedSelector
  )

  useEffect(() => {
    dispatch(startInitializingApp())
  }, [dispatch])

  useEffect(() => {
    if (appInitializationFinished) {
      dispatch(setAppInitializationStatus(AppInitializationStatus.Initialized))
    }
  }, [dispatch, appInitializationFinished])
}
