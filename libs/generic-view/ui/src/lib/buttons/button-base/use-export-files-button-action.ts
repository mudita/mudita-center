/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { useDispatch, useStore } from "react-redux"
import { useViewFormContext } from "generic-view/utils"
import { ReduxRootState, Dispatch } from "Core/__deprecated__/renderer/store"
import { FilesTransferExportFilesAction } from "generic-view/models"
import {
  sendFilesTransferAnalysis,
  clearFileTransferErrors,
  selectFilesSendingFailed,
  selectEntitiesByIds,
  FileWithPath,
  sendFiles,
  sendFilesClear,
  addFileTransferErrors,
} from "generic-view/store"
import { activeDeviceIdSelector } from "active-device-registry/feature"
import {
  getDevicePath,
  isMtpPathInternal,
  sliceMtpPaths,
} from "./file-transfer-paths-helper"
import { SendFilesAction } from "../../../../../store/src/lib/file-transfer/files-transfer.type"
import { validateFilesToExport } from "../../shared/validate-files-to-export"

export const useExportFilesButtonAction = () => {
  const store = useStore<ReduxRootState>()
  const dispatch = useDispatch<Dispatch>()
  const getFormContext = useViewFormContext()
  const deviceId = activeDeviceIdSelector(store.getState())

  return useCallback(
    async (
      action: FilesTransferExportFilesAction,
      callbacks: {
        onSuccess: () => Promise<void>
        onFailure: () => Promise<void>
        onValidationFailure: () => Promise<void>
      }
    ) => {
      const form = getFormContext(action.formOptions.formKey)

      if (action.entitiesType === undefined) return
      if (deviceId === undefined) return
      const selectedItems: string[] = getFormContext(
        action.sourceFormKey
      ).getValues(action.selectedItemsFieldName)

      const destinationPath: string = form.getValues(
        action.formOptions.selectedDirectoryFieldName
      )

      const entities = selectEntitiesByIds(store.getState(), {
        deviceId,
        entitiesType: action.entitiesType,
        ids: selectedItems,
      })
      const exportFilesData: FileWithPath[] = entities.map((e) => ({
        id: String(e.id),
        path: sliceMtpPaths(e.filePath as string, e.isInternal as boolean),
        name: String(e.fileName),
        size: Number(e.fileSize),
        groupId: action.actionId,
        devicePath: getDevicePath(e.filePath as string),
      }))

      const validationError = await validateFilesToExport(
        exportFilesData,
        destinationPath
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

      const sourcePath = entities[0].filePath as string

      const response = (await dispatch(
        sendFiles({
          files: exportFilesData,
          destinationPath,
          actionId: action.actionId,
          entitiesType: action.entitiesType,
          isMtpPathInternal: isMtpPathInternal(sourcePath),
          actionType: SendFilesAction.ActionExport,
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
      } else {
        await callbacks.onSuccess()
        dispatch(sendFilesClear({ groupId: action.actionId }))
        dispatch(clearFileTransferErrors({ actionId: action.actionId }))
      }
    },
    [dispatch, getFormContext, store, deviceId]
  )
}
