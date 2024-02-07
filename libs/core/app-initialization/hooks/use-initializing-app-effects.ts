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
import { isAppUpdateProcessPassed } from "Core/app-initialization/selectors/is-app-update-process-passed.selector"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ModalsManagerState } from "Core/modals-manager/reducers/modals-manager.interface"

export const useInitializingAppEffects = () => {
  const dispatch = useDispatch<Dispatch>()
  const appUpdateProcessPassed = useSelector(isAppUpdateProcessPassed)
  const { usbAccessFlowShow } = useSelector(
    (state: ReduxRootState): ModalsManagerState => state.modalsManager
  )

  useEffect(() => {
    dispatch(startInitializingApp())
  }, [dispatch])

  useEffect(() => {
    if (appUpdateProcessPassed && !usbAccessFlowShow) {
      dispatch(setAppInitializationStatus(AppInitializationStatus.Initialized))
    }
  }, [dispatch, appUpdateProcessPassed, usbAccessFlowShow])
}
