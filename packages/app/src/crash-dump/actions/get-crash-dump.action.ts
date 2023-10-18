/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCrashDumpsRequest } from "App/crash-dump/requests/get-crash-dumps.request"
import { CrashDumpError, Event } from "App/crash-dump/constants"
import { setCrashDump } from "App/crash-dump/actions/base.action"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { AppError } from "App/core/errors"

export const getCrashDump = createAsyncThunk<RequestResponseStatus | undefined>(
  Event.GetCrashDump,
  async (_, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as ReduxRootState

    if (state.crashDump.data.files.length) {
      return
    }

    const { status, error, data = [] } = await getCrashDumpsRequest()

    if (status === RequestResponseStatus.Ok && data) {
      dispatch(setCrashDump(data))
    } else {
      return rejectWithValue(
        new AppError(
          CrashDumpError.Getting,
          "Getting crash dumps from device isn't possible",
          error
        )
      )
    }

    return status
  }
)
