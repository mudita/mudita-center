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
  sendFilesClear,
} from "generic-view/store"
import { useDispatch, useStore } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { useViewFormContext } from "generic-view/utils"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import { validateSelectedFiles } from "../../shared/validate-selected-files"
import { MtpFileManagerService } from "device/feature"
import { getActiveMtpDeviceId } from "device-manager/feature"

export const useMtpUploadFilesButtonAction = () => {
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

      // Statystyki plików (jeśli kiedyś będą potrzebne)
      const validFiles = []
      for (const filePath of filesPaths) {
        const stats = await getFileStatsRequest(filePath)
        if (stats.ok) {
          validFiles.push(filePath)
        }
      }

      try {
        const mtpFileManagerService = MtpFileManagerService.getInstance()

        const uploadResults = await mtpFileManagerService.uploadFiles(
          validFiles,
          action.destinationPath,
          action.isInternal,
          getActiveMtpDeviceId(store.getState())
        )

        await mtpFileManagerService.waitUntilUploadComplete(
          uploadResults[0].transactionId
        )

        await callbacks.onSuccess()
        dispatch(sendFilesClear({ groupId: action.actionId }))
        dispatch(clearFileTransferErrors({ actionId: action.actionId }))
      } catch (error) {
        console.error("MTP upload failed", error)
        await callbacks.onFailure()
      }
    },
    [dispatch, getFormContext, store]
  )
}
