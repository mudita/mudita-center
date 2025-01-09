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
import path from "node:path"
import fs from "node:fs"
import { isEmpty } from "lodash"
import { createEntityDataAction } from "../entities/create-entity-data.action"

interface SendSelectedFilesActionPayload {
  typesName?: string
  fileTypes: string[]
  entitiesType?: string
  storagePath: string
  onSuccess?: (files: string[]) => Promise<void>
  onError?: (files: string[]) => Promise<void>
}

export const selectAndSendFilesAction = createAsyncThunk<
  undefined,
  SendSelectedFilesActionPayload,
  { state: ReduxRootState }
>(
  ActionName.SendSelectedFiles,
  async (
    { typesName, fileTypes, storagePath, entitiesType, onSuccess, onError },
    { rejectWithValue, dispatch, getState, signal }
  ) => {
    const failedFiles: string[] = []
    let postFileTransferInterval: NodeJS.Timeout | undefined
    let aborted = false

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
    }
    signal.addEventListener("abort", abortListener)

    const onFileFail = async (file: string, error?: string) => {
      console.error(error)
      postFileTransferInterval && clearInterval(postFileTransferInterval)
      failedFiles.push(file)
    }

    if (aborted) {
      return rejectWithValue(undefined)
    }

    const deviceId = selectActiveApiDeviceId(getState())
    const openFileResult = await openFileRequest({
      filters: [
        {
          name: typesName || "Media",
          extensions: fileTypes,
        },
      ],
      properties: ["openFile", "multiSelections"],
    })

    if (aborted) {
      return rejectWithValue(undefined)
    }
    if (!openFileResult.ok) {
      return rejectWithValue("cancelled")
    }

    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    for (const file of openFileResult.data) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      const fileName = path.basename(file)
      const sentFile = await dispatch(
        sendFile({
          filePath: file,
          targetPath: storagePath + fileName,
          deviceId,
        })
      )

      if (aborted) {
        return rejectWithValue(undefined)
      }
      if (
        sentFile.meta.requestStatus === "fulfilled" &&
        sentFile.payload &&
        "transferId" in sentFile.payload
      ) {
        if (entitiesType) {
          const resp = await dispatch(
            createEntityDataAction({
              deviceId,
              entitiesType,
              data: {
                filePath: storagePath + fileName,
                fileName,
                extension: "mp3",
                fileSize: 90804,
                fileType: "AUDIO",
                mimeType: "audio/mpeg",
                isInternal: true,
                entityType: entitiesType,
              },
            })
          )
          console.log(resp)
        }
      } else {
        await onFileFail(file)
      }
    }

    if (isEmpty(failedFiles)) {
      await onSuccess?.(openFileResult.data.map((file) => path.basename(file)))
    } else {
      await onError?.(failedFiles)
    }
    return
  }
)
