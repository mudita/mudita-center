/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { setSimData } from "Core/device/actions/base.action"
import { DeviceError, DeviceEvent } from "Core/device/constants"
import { SimCard } from "Core/__deprecated__/renderer/models/basic-info/basic-info.typings"
import changeSimRequest from "Core/__deprecated__/renderer/requests/change-sim.request"

export const changeSim = createAsyncThunk<SimCard, SimCard>(
  DeviceEvent.ChangeSimData,
  async (payload, { dispatch, rejectWithValue }) => {
    const response = await changeSimRequest()

    if (response.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(DeviceError.ChangeSim, "Cannot change sim card", response)
      )
    }

    dispatch(setSimData(payload.number))

    return payload
  }
)
