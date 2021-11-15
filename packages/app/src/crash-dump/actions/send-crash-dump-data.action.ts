/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Event } from "App/crash-dump/constants"
import { uploadFileRequest } from "App/uploader"
import readFile from "App/files-system/requests/read-file.request"
import { ReduxRootState } from "App/renderer/store"
import { SendingCrashDumpError } from "App/crash-dump/errors"
import { DeviceConnectionError } from "App/device"

export const sendCrashDumpData = createAsyncThunk(
  Event.SendCrashDump,
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as ReduxRootState

    if (!state.crashDump.data.downloadedFiles.length) {
      return
    }

    if (!state.device.data?.serialNumber) {
      return rejectWithValue(
        new DeviceConnectionError("Device isn't connected")
      )
    }

    for await (const path of state.crashDump.data.downloadedFiles) {
      const fileName = path.split("/").pop()
      const buffer = await readFile(path)

      if (buffer === undefined) {
        return
      }

      try {
        await uploadFileRequest({
          buffer,
          fileName: `${new Date().getTime()}-${fileName}`,
          serialNumber: state.device.data.serialNumber,
        })

        return
      } catch (error) {
        return rejectWithValue(
          new SendingCrashDumpError(
            "The error happened during crash dump sending process",
            error
          )
        )
      }
    }

    return
  }
)
