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
import {
  HarmonyDeviceData,
  loadDeviceData,
  PureDeviceData,
  setDeviceData,
} from "Core/device"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { trackOsVersion } from "Core/analytic-data-tracker/helpers"
import { MetadataKey, setValue } from "Core/metadata"
import { DeviceInfo } from "Core/device-info/dto"

const isDeviceInfo = (
  data: DeviceInfo | undefined | null | unknown
): data is PureDeviceData | HarmonyDeviceData => {
  return data !== undefined && data !== null
}

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

    // TODO: refactor initializationOptions.data
    if (activeDevice.initializationOptions.data) {
      const { payload: data } = await dispatch(loadDeviceData())

      if (isDeviceInfo(data)) {
        console.log("initializationOptions data: ", data)
        void trackOsVersion({
          serialNumber: data.serialNumber,
          osVersion: data.osVersion,
          deviceType: activeDevice.deviceType,
        })
        void setValue({
          key: MetadataKey.DeviceOsVersion,
          value: data.osVersion ?? null,
        })
        void setValue({
          key: MetadataKey.DeviceType,
          value: activeDevice.deviceType,
        })

        dispatch(
          setDeviceData({ ...data, deviceType: activeDevice.deviceType })
        )
      } else {
        // TODO: handle when load data throw error
      }
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
