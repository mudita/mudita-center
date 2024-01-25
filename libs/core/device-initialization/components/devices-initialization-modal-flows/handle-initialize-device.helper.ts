/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { History } from "history"
import { Dispatch } from "redux"
import { AsyncThunkAction, SerializedError } from "@reduxjs/toolkit"
import {
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { initializeMuditaPure } from "Core/device-initialization/actions/initialize-mudita-pure.action"
import { initializeMuditaHarmony } from "Core/device-initialization/actions/initialize-mudita-harmony.action"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

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

export async function handleInitializeDevice(
  dispatch: AppDispatch,
  initializeFunction:
    | typeof initializeMuditaPure
    | typeof initializeMuditaHarmony,
  history: History
): Promise<void> {
  const { payload, error } = await dispatch(initializeFunction())
  if (error !== undefined) {
    history.push(URL_ONBOARDING.troubleshooting)
  } else if (payload === DeviceInitializationStatus.Initialized) {
    history.push(URL_OVERVIEW.root)
  }
}
