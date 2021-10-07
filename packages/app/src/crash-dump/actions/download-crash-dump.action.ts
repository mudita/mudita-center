/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import downloadDeviceCrashDumpFiles from "App/renderer/requests/download-crash-dump.request"
import { Event } from "App/crash-dump/constants"
import { DownloadCrashDumpError } from "App/crash-dump/errors"
import { setDownloadedCrashDump } from "App/crash-dump/actions/base.action"
// import { ReduxRootState } from "App/renderer/store"

export const downloadCrashDump = createAsyncThunk<DeviceResponseStatus | undefined>(Event.DownloadCrashDump, async (_, { dispatch, rejectWithValue }) => {
  // const state = getState() as ReduxRootState

  // if (!state.crashDump.data.files.length) {
  //   return
  // }

  const { status, error, data = [] } = await downloadDeviceCrashDumpFiles()

  console.log("DATA: ", data)
  console.log("ERROR: ", error)

  if (status === DeviceResponseStatus.Ok && data) {
    dispatch(setDownloadedCrashDump(data))
  } else {
    return rejectWithValue(new DownloadCrashDumpError("Downloading process have been interrupted", error))
  }

  return status
})
