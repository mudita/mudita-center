/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { postSendFileRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ActionName } from "../action-names"
import { fileTransferSendPostProcessing } from "./actions"
import { AppError, AppErrorType } from "Core/core/errors"
import { delay } from "shared/utils"

export type SendFileErrorPayload = {
  transferId: number
}

interface SendFileError {
  deviceId: DeviceId
  error: AppError<AppErrorType, SendFileErrorPayload>
}

export const postSendFile = createAsyncThunk<
  undefined,
  { deviceId: DeviceId; transferId: number },
  { state: ReduxRootState; rejectValue: SendFileError | undefined }
>(
  ActionName.PostFileTransferSend,
  async ({ deviceId, transferId }, { rejectWithValue, dispatch, signal }) => {
    let finished = false
    let aborted = false

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
    }
    signal.addEventListener("abort", abortListener)

    if (aborted) {
      return rejectWithValue(undefined)
    }

    do {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      const { ok, data, error } = await postSendFileRequest(
        transferId,
        deviceId
      )
      if (aborted) {
        return rejectWithValue(undefined)
      }
      if (!ok) {
        return rejectWithValue({
          deviceId,
          error: {
            ...error,
            payload: {
              transferId,
            },
          },
        })
      }
      finished = data.finished
      dispatch(
        fileTransferSendPostProcessing({
          progress: data.progress,
          transferId,
        })
      )
      await delay(1000)
    } while (!finished)

    return
  }
)
