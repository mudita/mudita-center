/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import { setDownloadedCrashDump } from "Core/crash-dump/actions/base.action"
import { sendCrashDumpData } from "Core/crash-dump/actions/send-crash-dump-data.action"
import { CrashDumpError, Event } from "Core/crash-dump/constants"
import { downloadCrashDumpRequest } from "Core/crash-dump/requests/download-crash-dump.request"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { CrashDump } from "Core/crash-dump/dto"

export const downloadCrashDump = createAsyncThunk<
  RequestResponseStatus | undefined,
  CrashDump
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
      void dispatch(
        sendCrashDumpData({
          email,
          description: (description || "").replace(/\r\n|\r|\n/g, "<br/>"),
        })
      )
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
