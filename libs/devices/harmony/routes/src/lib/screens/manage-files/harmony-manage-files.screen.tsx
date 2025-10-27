/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"
import { AppError, AppResultFactory } from "app-utils/models"
import {
  uploadFileToHarmony,
  UploadFileToHarmonyError,
  useHarmonyDeleteFileMutation,
} from "devices/harmony/feature"
import {
  openFileDialog,
  useActiveDeviceQuery,
  useManageFilesSelection,
} from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import {
  FileTransferResult,
  ManageFiles,
  ManageFilesViewProps,
  TransferErrorName,
} from "devices/common/ui"
import { HarmonyManageFilesTableSection } from "./harmony-manage-files-table-section"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"
import { HarmonyManageFilesMessages } from "./harmony-manage-files.messages"
import { OTHER_FILES_LABEL_TEXTS } from "./harmony-manage-files.config"

export const HarmonyManageFilesScreen: FunctionComponent = () => {
  const { data: activeDevice } = useActiveDeviceQuery<Harmony>()
  const {
    isLoading,
    segments,
    categories,
    categoryFileMap,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
    refetch,
  } = useHarmonyManageFiles(activeDevice)

  const { mutateAsync: deleteFile } = useHarmonyDeleteFileMutation(activeDevice)

  const { activeCategoryId, setActiveCategoryId, activeFileMap } =
    useManageFilesSelection({ categories, categoryFileMap })

  const transferFile: ManageFilesViewProps["transferFile"] = async (
    params
  ): Promise<FileTransferResult> => {
    const targetDirectoryPath = categories.find(
      ({ id }) => id === activeCategoryId
    )?.directoryPath
    if (!activeDevice || !targetDirectoryPath) {
      return AppResultFactory.failed(
        new AppError("", TransferErrorName.UploadUnknown)
      )
    }

    const targetPath = `${targetDirectoryPath}/${params.file.name}`

    try {
      const uploadFileToHarmonyResponse = await uploadFileToHarmony({
        device: activeDevice,
        targetPath,
        onProgress: params.onProgress,
        abortController: params.abortController,
        fileLocation: { fileAbsolutePath: params.file.id, absolute: true },
      })

      if (!uploadFileToHarmonyResponse) {
        return AppResultFactory.failed(
          new AppError("", TransferErrorName.UploadUnknown)
        )
      }
      return AppResultFactory.success()
    } catch (error) {
      if (error === UploadFileToHarmonyError.Aborted) {
        try {
          // In case of abort during upload, the file may be partially uploaded. Attempt to delete it.
          // Ignore any errors from deleteFile to avoid masking the original abort error.
          await deleteFile(targetPath)
        } catch (e) {
          console.warn("Failed to delete file after abort", e)
        }

        return AppResultFactory.failed(
          new AppError("", TransferErrorName.Cancelled),
          {}
        )
      } else {
        return AppResultFactory.failed(
          new AppError("", TransferErrorName.UploadUnknown)
        )
      }
    }
  }

  const deleteFiles: ManageFilesViewProps["deleteFiles"] = async (
    itemIds
  ): Promise<{ failedIds: string[] }> => {
    const failedIds: string[] = []

    for (const itemId of itemIds) {
      try {
        await deleteFile(itemId)
      } catch {
        failedIds.push(itemId)
      }
    }

    return { failedIds }
  }

  return (
    <>
      <DashboardHeaderTitle
        title={formatMessage(HarmonyManageFilesMessages.pageTitle)}
      />
      <ManageFiles
        activeCategoryId={activeCategoryId}
        activeFileMap={activeFileMap}
        onActiveCategoryChange={setActiveCategoryId}
        segments={segments}
        categories={categories}
        freeSpaceBytes={freeSpaceBytes}
        usedSpaceBytes={usedSpaceBytes}
        otherSpaceBytes={otherSpaceBytes}
        deleteFiles={deleteFiles}
        onDeleteSuccess={refetch}
        isLoading={isLoading}
        otherFiles={OTHER_FILES_LABEL_TEXTS}
        openFileDialog={openFileDialog}
        transferFile={transferFile}
        messages={HarmonyManageFilesMessages}
        onTransferSuccess={refetch}
      >
        {(props) => (
          <HarmonyManageFilesTableSection fileMap={activeFileMap} {...props} />
        )}
      </ManageFiles>
    </>
  )
}
