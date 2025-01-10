/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../action-names"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { sendFile } from "./send-file.action"
import { selectActiveApiDeviceId } from "../selectors"
import path from "node:path"

type Path = string

interface SendSelectedFilesActionReturned {
  sentFiles: Path[]
  failedFiles: Path[]
}

interface SendSelectedFilesActionPayload {
  filesPaths: Path[]
  targetPath: Path
  onFileSuccess?: (file: Path) => Promise<void>
  onFileError?: (file: Path, error?: string) => Promise<void>
}

export const sendFilesAction = createAsyncThunk<
  SendSelectedFilesActionReturned,
  SendSelectedFilesActionPayload,
  { state: ReduxRootState }
>(
  ActionName.SendSelectedFiles,
  async (
    { filesPaths, targetPath, onFileSuccess, onFileError },
    { rejectWithValue, dispatch, getState, signal }
  ) => {
    const failedFiles: string[] = []
    const sentFiles: string[] = []

    const sendFileAbortController = new AbortController()

    let postFileTransferInterval: NodeJS.Timeout | undefined
    let aborted = false

    const abortListener = async () => {
      signal.removeEventListener("abort", abortListener)
      aborted = true
      sendFileAbortController.abort()
    }
    signal.addEventListener("abort", abortListener)

    const handleFileError = async (file: string, error?: string) => {
      console.error(error)
      postFileTransferInterval && clearInterval(postFileTransferInterval)
      failedFiles.push(file)
      await onFileError?.(file, error)
    }

    const handleFileSuccess = async (file: string) => {
      sentFiles.push(file)
      onFileSuccess?.(file)
    }

    if (aborted) {
      return rejectWithValue(undefined)
    }

    const deviceId = selectActiveApiDeviceId(getState())
    if (!deviceId) {
      return rejectWithValue(undefined)
    }

    for (const file of filesPaths) {
      if (aborted) {
        return rejectWithValue(undefined)
      }
      const fileName = path.basename(file)
      const sentFilePromise = dispatch(
        sendFile({
          filePath: file,
          targetPath: targetPath + fileName,
          deviceId,
        })
      )
      sendFileAbortController.abort = sentFilePromise.abort
      const sentFile = await sentFilePromise

      if (aborted) {
        return rejectWithValue(undefined)
      }
      if (
        sentFile.meta.requestStatus === "fulfilled" &&
        sentFile.payload &&
        "transferId" in sentFile.payload
      ) {
        await handleFileSuccess(file)
        // if (entitiesType) {
        //   const fileEntity = await dispatch(
        //     createEntityDataAction({
        //       deviceId,
        //       entitiesType,
        //       data: {
        //         filePath: targetPath + fileName,
        //         entityType: entitiesType,
        //       },
        //     })
        //   )
        //   if (fileEntity.meta.requestStatus === "rejected") {
        //     await onFileFail(file)
        //   }
        // }
      } else {
        await handleFileError(file)
      }
    }
    //
    // if (isEmpty(failedFiles)) {
    //   console.log("All files sent successfully")
    //   await onSuccess?.(openFileResult.data.map((file) => path.basename(file)))
    // } else {
    //   console.error("Some files failed to send", JSON.stringify(failedFiles))
    //   await onError?.(failedFiles)
    // }
    return {
      sentFiles,
      failedFiles,
    }
  }
)
