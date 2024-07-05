/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { getDeviceConfigurationRequest } from "../requests"
import { DeviceConfiguration } from "../controllers"
import { CoreDeviceEvent } from "../constants"

interface ConfigureDevicePayload extends Partial<DeviceConfiguration> {
  id: DeviceId
}

export const configureDevice = createAsyncThunk<
  ConfigureDevicePayload,
  DeviceId,
  { state: ReduxRootState }
>(CoreDeviceEvent.ConfigureDevice, async (id) => {
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
