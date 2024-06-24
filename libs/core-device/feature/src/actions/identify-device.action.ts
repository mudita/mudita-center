/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { getDeviceIdentificationRequest } from "../requests"
import { DeviceIdentification } from "../controllers"
import { CoreDeviceEvent } from "../constants"

interface IdentifyDevicePayload extends Partial<DeviceIdentification> {
  id: DeviceId
}

export const identifyDevice = createAsyncThunk<
  IdentifyDevicePayload,
  DeviceId,
  { state: ReduxRootState }
>(CoreDeviceEvent.IdentifyDevice, async (id, { getState }) => {
  const result = await getDeviceIdentificationRequest(id)

  if (result.ok) {
    return {
      id,
      ...result.data,
    }
  } else {
    return { id }
  }
})
