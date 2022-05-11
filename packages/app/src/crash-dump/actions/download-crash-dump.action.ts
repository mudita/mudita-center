/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import { DownloadCrashDumpError } from "App/crash-dump/errors"
import { setDownloadedCrashDump } from "App/crash-dump/actions/base.action"
import { sendCrashDumpData } from "App/crash-dump/actions/send-crash-dump-data.action"
import { ReduxRootState } from "App/renderer/store"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { downloadCrashDumpRequest } from "App/crash-dump/requests/download-crash-dump.request"

export const downloadCrashDump = createAsyncThunk<
  RequestResponseStatus | undefined
>(
  Event.DownloadCrashDump,
  async (_, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as ReduxRootState

    if (!state.crashDump.data.files.length) {
      return
    }

    const { status, error, data } = await downloadCrashDumpRequest()

    if (status === RequestResponseStatus.Ok && data) {
      dispatch(setDownloadedCrashDump(data))
      dispatch(sendCrashDumpData())
    } else {
      return rejectWithValue(
        new DownloadCrashDumpError(
          "Downloading process have been interrupted",
          error
        )
      )
    }

    return status
  }
)
