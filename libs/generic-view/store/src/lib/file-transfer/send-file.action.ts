/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { sendFileRequest, startPreSendFileRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ActionName } from "../action-names"
import { fileTransferChunkSent, fileTransferPrepared } from "./actions"

export const sendFile = createAsyncThunk<
  { transferId: number },
  { deviceId: DeviceId; filePath: string; targetPath: string },
  { state: ReduxRootState }
>(
  ActionName.FileTransferSend,
  async ({ deviceId, filePath, targetPath }, { rejectWithValue, dispatch }) => {
    const preTransferResponse = await startPreSendFileRequest(
      filePath,
      targetPath,
      deviceId
    )

    if (preTransferResponse.ok) {
      const { transferId, chunksCount } = preTransferResponse.data
      dispatch(
        fileTransferPrepared({
          transferId,
          chunksCount,
        })
      )

      for (let chunkNumber = 1; chunkNumber <= chunksCount; chunkNumber++) {
        // TODO: consider using signal to abort
        await sendFileRequest(transferId, chunkNumber)
        dispatch(
          fileTransferChunkSent({
            transferId,
            chunksTransferred: chunkNumber,
          })
        )
      }
      return { transferId }
    } else {
      return rejectWithValue({
        deviceId,
        data: preTransferResponse.error,
      })
    }
  }
)
