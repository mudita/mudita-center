/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import changeSimRequest from "App/__deprecated__/renderer/requests/change-sim.request"
import { DeviceEvent } from "App/device/constants"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import { DeviceChangeSimError } from "App/device/errors"
import { setSimData } from "App/device/actions/base.action"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export const changeSim = createAsyncThunk<SimCard, SimCard>(
  DeviceEvent.ChangeSimData,
  async (payload, { dispatch, rejectWithValue }) => {
    const response = await changeSimRequest()

    if (response.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new DeviceChangeSimError("Cannot change sim card", response)
      )
    }

    dispatch(setSimData(payload.number))

    return payload
  }
)
