/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { openFileRequest } from "system-utils/feature"
import { sendFile } from "./send-file.action"
import { selectActiveApiDeviceId } from "../selectors"
import * as path from "node:path"
import { isEmpty } from "lodash"

interface SendSelectedFilesActionPayload {
  typesName: string
  fileTypes: string[]
  storagePath: string
  onFileSuccess?: (file: string) => Promise<void>
  onFileError?: (file: string) => Promise<void>
  onSuccess?: () => Promise<void>
  onError?: () => Promise<void>
}

export const selectAndSendFilesAction = createAsyncThunk<
  undefined,
  SendSelectedFilesActionPayload,
  { state: ReduxRootState }
>(
  ActionName.SendSelectedFiles,
  async (
    {
      typesName,
      fileTypes,
      storagePath,
      onFileSuccess,
      onFileError,
      onSuccess,
      onError,
    },
    { rejectWithValue, dispatch, getState }
  ) => {
    const failedFiles = []

    const deviceId = selectActiveApiDeviceId(getState())
    const openFileResult = await openFileRequest({
      filters: [
        {
          name: typesName,
          extensions: fileTypes,
        },
      ],
      properties: ["openFile", "multiSelections"],
    })

    if (!openFileResult.ok) {
      return rejectWithValue("cancelled")
    }

    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    for (const file of openFileResult.data) {
      const fileName = path.basename(file)
      const sentFile = await dispatch(
        sendFile({
          filePath: file,
          targetPath: storagePath + fileName,
          deviceId,
        })
      )
      if (sentFile.meta.requestStatus === "fulfilled") {
        await onFileSuccess?.(file)
      } else {
        failedFiles.push(file)
        await onFileError?.(file)
      }
    }
    if (isEmpty(failedFiles)) {
      await onSuccess?.()
    } else {
      await onError?.()
    }
    return
  }
)
