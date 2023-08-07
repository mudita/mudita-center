/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setConnectionStatus } from "App/device/actions/set-connection-status.action"
import { DeviceEvent } from "App/device/constants"

export const disconnectDevice = createAsyncThunk(
  DeviceEvent.Disconnected,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_, { dispatch }) => {
    void dispatch(setConnectionStatus(false))

    return
  }
)
