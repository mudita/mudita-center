/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import {
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
  URL_ONBOARDING,
} from "Core/__deprecated__/renderer/constants/urls"
import { removeDevice } from "Core/device-manager/actions/base.action"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { deactivateDevice } from "Core/device-manager/actions/deactivate-device.action"
import { DownloadState } from "Core/update/constants"

export const handleDeviceDetached = createAsyncThunk<
  void,
  { properties: DeviceBaseProperties; history: History },
  { state: ReduxRootState }
>(
  DeviceManagerEvent.HandleDeviceDetached,
  async (payload, { dispatch, getState }) => {
    const { history, properties } = payload

    const activeDevice = getActiveDevice(getState())

    dispatch(removeDevice(properties))

    if (activeDevice?.id !== properties.id) {
      return
    }

    const activeDeviceProcessing = isActiveDeviceProcessingSelector(getState())

    if (activeDeviceProcessing) {
      return
    }

    if (getState().update.downloadState === DownloadState.Loading) {
      history.push(URL_ONBOARDING.welcome)
      return
    }

    await dispatch(deactivateDevice())

    const devices = getDevicesSelector(getState())

    if (devices.length > 0) {
      history.push(URL_DISCOVERY_DEVICE.root)
    } else {
      history.push(URL_MAIN.news)
    }
  }
)
