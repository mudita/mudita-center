/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceInitializationEvent } from "Core/device-initialization/constants/event.constant"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"
import { loadDeviceData } from "Core/device"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { processDeviceDataOnLoad } from "Core/device/actions/process-device-data-on-load.action"

export const startInitializingDevice = createAsyncThunk<
  void,
  History,
  { state: ReduxRootState }
>(
  DeviceInitializationEvent.StartInitializingDevice,
  async (history, { dispatch, getState }) => {
    const activeDevice = getActiveDevice(getState())
    if (activeDevice == undefined) {
      // TODO: handle active device as undefined
      return
    }

    if (activeDevice.initializationOptions.eula) {
      return
    }

    if (activeDevice.initializationOptions.passcode) {
      return
    }

    if (activeDevice.initializationOptions.data) {
      // TODO: handle when load data throw error
      await dispatch(loadDeviceData())
      await dispatch(processDeviceDataOnLoad())
    }

    if (activeDevice.initializationOptions.sync) {
      return
    }
    dispatch(
      setDeviceInitializationStatus(DeviceInitializationStatus.Initialized)
    )

    history.push(URL_OVERVIEW.root)
  }
)
