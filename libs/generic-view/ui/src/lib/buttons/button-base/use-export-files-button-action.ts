/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { useCallback } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { useViewFormContext } from "generic-view/utils"
import { ReduxRootState, Dispatch } from "Core/__deprecated__/renderer/store"
import { FilesTransferExportFilesAction } from "generic-view/models"
import {
  exportFiles,
  ExportFilesPayload,
  sendFilesTransferAnalysis,
  clearFileTransferErrors,
  addFileTransferErrors,
  selectFilesSendingFailed,
  selectFilesSendingGroup,
  selectEntitiesByIds,
  ExportFileItem,
} from "generic-view/store"
import { activeDeviceIdSelector } from "active-device-registry/feature"

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
      console.log(action.entitiesType)
      if (action.entitiesType === undefined) return
      if (deviceId === undefined) return
      const selectedItems: string[] = getFormContext(
        action.sourceFormKey
      ).getValues(action.selectedItemsFieldName)

      const destinationPath: string = form.getValues(
        action.formOptions.selectedDirectoryFieldName
      )

      console.log(destinationPath)

      //TODO WALIDACJA dostepnej przestrzeni w docelowej lokalizacji
      //   if (
      //     !destinationPath ||
      //     selectedItems.length === 0 ||
      //     !action.entitiesType
      //   ) {
      //     dispatch(
      //       addFileTransferErrors({
      //         actionId: action.actionId,
      //         errors: [
      //           { message: "Brak wybranych plików lub ścieżki docelowej" },
      //         ],
      //       })
      //     )
      //     await callbacks.onValidationFailure()
      //     return
      //   }
      console.log(selectedItems)
      const entities = selectEntitiesByIds(store.getState(), {
        deviceId,
        entitiesType: action.entitiesType,
        ids: selectedItems,
      })
      console.log(entities)
      const exportFilesData: ExportFileItem[] = entities.map((e) => ({
        id: String(e.id),
        path: String(e.filePath),
        fileName: String(e.fileName),
        fileSize: Number(e.fileSize),
      }))
      const response = (await dispatch(
        exportFiles({
          files: exportFilesData,
          destinationPath,
          actionId: action.actionId,
          entitiesType: action.entitiesType,
        })
      )) as Awaited<ReturnType<ReturnType<typeof exportFiles>>>

      const failedFiles = selectFilesSendingFailed(store.getState(), {
        groupId: action.actionId,
      })

      //dispatch(sendFilesTransferAnalysis({ groupId: action.actionId }))

      if (
        response.meta.requestStatus === "rejected" ||
        failedFiles.length > 0
      ) {
        await callbacks.onFailure()
      } else {
        await callbacks.onSuccess()
        dispatch(clearFileTransferErrors({ actionId: action.actionId }))
      }
    },
    [dispatch, getFormContext, store]
  )
}
