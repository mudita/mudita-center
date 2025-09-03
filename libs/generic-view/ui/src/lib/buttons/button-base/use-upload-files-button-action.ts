/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import path from "node:path"
import { getFileStatsRequest } from "system-utils/feature"
import { FilesTransferUploadFilesAction } from "generic-view/models"
import {
  addFileTransferErrors,
  clearFileTransferErrors,
  selectFilesSendingFailed,
  selectValidEntityFilePaths,
  sendFiles,
  sendFilesClear,
  SendFilesPayload,
  sendFilesTransferAnalysis,
} from "generic-view/store"
import { useDispatch, useStore } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { useViewFormContext } from "generic-view/utils"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { validateSelectedFiles } from "../../shared/validate-selected-files"
import { isMtpPathInternal } from "./file-transfer-paths-helper"
import { SendFilesAction } from "../../../../../store/src/lib/file-transfer/files-transfer.type"

export const useUploadFilesButtonAction = () => {
  const store = useStore<ReduxRootState>()
  const getFormContext = useViewFormContext()
  const dispatch = useDispatch<Dispatch>()

  return useCallback(
    async (
      action: FilesTransferUploadFilesAction,
      callbacks: {
        onSuccess: () => Promise<void>
        onFailure: () => Promise<void>
        onValidationFailure: () => Promise<void>
      }
    ) => {
      const deviceId = activeDeviceIdSelector(store.getState())

      const filesPaths: string[] = getFormContext(
        action.formOptions.formKey
      ).getValues(action.formOptions.filesToUploadFieldName)
      if (filesPaths.length === 0) return
      if (action.entitiesType === undefined) return
      if (deviceId === undefined) return

      const entityFilePaths = selectValidEntityFilePaths(store.getState(), {
        entitiesType: action.entitiesType,
        deviceId,
      })

      if (entityFilePaths === undefined) return

      const validationError = await validateSelectedFiles(
        filesPaths,
        entityFilePaths,
        action.freeSpace,
        action.destinationPath
      )

      if (validationError !== undefined) {
        dispatch(
          addFileTransferErrors({
            actionId: action.actionId,
            errors: [validationError],
          })
        )
        await callbacks.onValidationFailure()
        return
      }

      const files: SendFilesPayload["files"] = []

      for (const filePath of filesPaths) {
        const fileStats = await getFileStatsRequest(filePath)
        if (!fileStats.ok) continue
        files.push({
          id: filePath,
          path: filePath,
          size: fileStats.data.size,
          groupId: action.actionId,
          name: path.basename(filePath),
        })
      }

      const isDestinationInternal = isMtpPathInternal(action.destinationPath)
      const response = (await dispatch(
        sendFiles({
          files,
          actionId: action.actionId,
          destinationPath: action.destinationPath,
          entitiesType: action.entitiesType,
          isMtpPathInternal: isDestinationInternal,
          actionType: SendFilesAction.ActionUpload,
        })
      )) as Awaited<ReturnType<ReturnType<typeof sendFiles>>>

      const failedFiles = selectFilesSendingFailed(store.getState(), {
        groupId: action.actionId,
      })

      dispatch(sendFilesTransferAnalysis({ groupId: action.actionId }))
      if (
        response.meta.requestStatus === "rejected" ||
        failedFiles.length > 0
      ) {
        await callbacks.onFailure()
      } else if (filesPaths.length > 0) {
        await callbacks.onSuccess()
        dispatch(sendFilesClear({ groupId: action.actionId }))
        dispatch(clearFileTransferErrors({ actionId: action.actionId }))
      }
    },
    [dispatch, getFormContext, store]
  )
}
