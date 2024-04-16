/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCrashDumpsRequest } from "Core/crash-dump/requests/get-crash-dumps.request"
import { CrashDumpError, Event } from "Core/crash-dump/constants"
import { setCrashDump } from "Core/crash-dump/actions/base.action"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { AppError } from "Core/core/errors"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getCrashDump = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(Event.GetCrashDump, async (_, { dispatch, rejectWithValue }) => {
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

  return
})
