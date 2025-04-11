/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { getFileStatsRequest } from "system-utils/feature"
import { FilesTransferUploadFilesAction } from "generic-view/models"
import {
  addFileTransferErrors,
  clearFileTransferErrors,
  selectValidEntityFilePaths,
  clearMtpUploads,
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

      if (!filesPaths.length || !action.entitiesType || !deviceId) return

      const entityFilePaths = selectValidEntityFilePaths(store.getState(), {
        entitiesType: action.entitiesType,
        deviceId,
      })
      if (!entityFilePaths) return

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

      const validFiles: string[] = []
      for (const filePath of filesPaths) {
        const stats = await getFileStatsRequest(filePath)
        if (stats.ok) validFiles.push(filePath)
      }

      const waitUntilAllUploadsFinished = (
        transactionIds: string[],
        interval = 500
      ): Promise<void> => {
        return new Promise((resolve) => {
          const check = () => {
            const state = store.getState()
            const allDone = transactionIds.every((txId) => {
              const upload = state.mtpFileTransfer.uploads[txId]
              return upload?.status === "finished"
            })

            if (allDone) {
              resolve()
            } else {
              setTimeout(check, interval)
            }
          }

          check()
        })
      }

      try {
        const mtpFileManagerService =
          MtpFileManagerService.getInstance(dispatch)

        const uploadResults = await mtpFileManagerService.uploadFiles(
          validFiles,
          action.destinationPath,
          action.isInternal,
          getActiveMtpDeviceId(store.getState())
        )

        const transactionIds = uploadResults
          .map((r) => r.transactionId)
          .filter(Boolean)

        await waitUntilAllUploadsFinished(transactionIds)

        await callbacks.onSuccess()
        dispatch(clearMtpUploads())
        dispatch(clearFileTransferErrors({ actionId: action.actionId }))
      } catch (error) {
        console.error("MTP upload failed", error)
        await callbacks.onFailure()
      }
    },
    [dispatch, getFormContext, store]
  )
}
