/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startInitializingApp } from "Core/app-initialization/actions/start-initializing-app"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { setAppInitializationStatus } from "Core/app-initialization/actions/base.action"
import { AppInitializationStatus } from "Core/app-initialization/reducers/app-initialization.interface"
import { isAppUpdateProcessPassed } from "Core/app-initialization/selectors/is-app-update-process-passed.selector"
import { redirectToDiscovery } from "Core/app-initialization/actions/redirect-to-discovery.action"

export const useInitializingAppEffects = () => {
  const history = useHistory()
  const dispatch = useDispatch<Dispatch>()
  const appUpdateProcessPassed = useSelector(isAppUpdateProcessPassed)

  useEffect(() => {
    dispatch(startInitializingApp())
  }, [dispatch])

  useEffect(() => {
    if (appUpdateProcessPassed) {
      dispatch(setAppInitializationStatus(AppInitializationStatus.Initialized))
      dispatch(redirectToDiscovery(history))
    }
  }, [history, dispatch, appUpdateProcessPassed])
}