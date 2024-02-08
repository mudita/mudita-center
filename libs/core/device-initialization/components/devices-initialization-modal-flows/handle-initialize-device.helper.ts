/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { AsyncThunkAction, SerializedError } from "@reduxjs/toolkit"
import {
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { initializeMuditaPure } from "Core/device-initialization/actions/initialize-mudita-pure.action"
import { initializeMuditaHarmony } from "Core/device-initialization/actions/initialize-mudita-harmony.action"

type AppDispatch = Dispatch & {
  <
    ReturnType extends Promise<{
      payload?: DeviceInitializationStatus
      error?: SerializedError
    }>
  >(
    asyncAction: AsyncThunkAction<
      DeviceInitializationStatus,
      void,
      { state: ReduxRootState }
    >
  ): ReturnType
}
export const useDeviceInitializer = (
  initializeFunction:
    | typeof initializeMuditaPure
    | typeof initializeMuditaHarmony
) => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(async () => {
    const { payload, error } = await dispatch(initializeFunction())

    if (!isMounted.current) {
      return
    }

    if (error !== undefined) {
      history.push(URL_ONBOARDING.troubleshooting)
    } else if (payload === DeviceInitializationStatus.Initialized) {
      history.push(URL_OVERVIEW.root)
    }
  }, [dispatch, history, initializeFunction])
}
