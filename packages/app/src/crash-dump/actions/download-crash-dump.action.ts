/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { setDownloadedCrashDump } from "App/crash-dump/actions/base.action"
import { sendCrashDumpData } from "App/crash-dump/actions/send-crash-dump-data.action"
import { CrashDumpError, Event } from "App/crash-dump/constants"
import { downloadCrashDumpRequest } from "App/crash-dump/requests/download-crash-dump.request"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { SendCrashDumpPayload } from "App/crash-dump/reducers/crash-dump.interface"

export const downloadCrashDump = createAsyncThunk<
  RequestResponseStatus | undefined,
  SendCrashDumpPayload
>(
  Event.DownloadCrashDump,
  async ({ email, description }, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as ReduxRootState

    if (!state.crashDump.data.files.length) {
      return
    }

    const { status, error, data } = await downloadCrashDumpRequest()

    if (status === RequestResponseStatus.Ok && data) {
      dispatch(setDownloadedCrashDump(data))
      void dispatch(sendCrashDumpData({ email, description }))
    } else {
      return rejectWithValue(
        new AppError(
          CrashDumpError.Downloading,
          "Downloading process have been interrupted",
          error
        )
      )
    }

    return status
  }
)
