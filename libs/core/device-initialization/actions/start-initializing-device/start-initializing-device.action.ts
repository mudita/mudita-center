/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { DeviceType } from "Core/device"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationEvent } from "Core/device-initialization/constants/event.constant"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import {
  URL_ONBOARDING,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { initializeMuditaHarmony } from "Core/device-initialization/actions/start-initializing-device/initialize-mudita-harmony"
import { initializeMuditaPure } from "Core/device-initialization/actions/start-initializing-device/initialize-mudita-pure"

export const startInitializingDevice = createAsyncThunk<
  void,
  History,
  { state: ReduxRootState }
>(
  DeviceInitializationEvent.StartInitializingDevice,
  async (history, { dispatch, getState }) => {
    const activeDevice = getActiveDevice(getState())

    if (activeDevice === undefined) {
      history.push(URL_ONBOARDING.troubleshooting)
      return
    }

    if (activeDevice.deviceType === DeviceType.MuditaPure) {
      return await initializeMuditaPure(history, dispatch, getState)
    } else if (activeDevice.deviceType === DeviceType.MuditaHarmony) {
      return await initializeMuditaHarmony(history, dispatch, getState)
    } else {
      dispatch(
        setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
      )

      history.push(URL_OVERVIEW.root)
    }
  }
)
