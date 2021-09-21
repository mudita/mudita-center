/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import changeSimRequest from "Renderer/requests/change-sim.request"
import { DeviceEvent } from "App/device/constants"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import { DeviceChangeSimError } from "App/device/errors"
import { setSimData } from "App/device/actions/base.action"

export const changeSim = createAsyncThunk<SimCard, SimCard>(
  DeviceEvent.ChangeSimData,
  async (payload, { dispatch, rejectWithValue }) => {
    const response = await changeSimRequest()

    if (response.status !== DeviceResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceChangeSimError("Cannot change sim card", response)
      )
    }

    dispatch(setSimData(payload.number))

    return payload
  }
)
