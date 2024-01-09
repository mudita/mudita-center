/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { DeviceId } from "Core/device/constants/device-id"
import { getDeviceConfigurationRequest } from "Core/device-manager/requests/get-device-configuration.request"
import { DeviceConfiguration } from "Core/device-manager/controllers"
import { DeviceType } from "Core/device"

interface ConfigureDevicePayload extends Partial<DeviceConfiguration> {
  id: DeviceId
}

export const configureDevice = createAsyncThunk<
  ConfigureDevicePayload,
  DeviceId,
  { state: ReduxRootState }
>(DeviceManagerEvent.ConfigureDevice, async (id, {getState}) => {
  // TODO: tmp solution to handle APIDevice
  const device = getState().deviceManager.devices.find((device) => device.id === id)
  if(device?.deviceType === DeviceType.APIDevice){
    return { id }
  }

  const result = await getDeviceConfigurationRequest(id)

  if (result.ok) {
    return {
      id,
      ...result.data,
    }
  } else {
    return { id }
  }
})
