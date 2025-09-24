/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { FunctionComponent, useMemo, useState } from "react"
import { formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"
import { AppActions, AppFileSystem } from "app-utils/renderer"
import {
  AppError,
  AppResultFactory,
  OpenDialogOptionsLite,
} from "app-utils/models"
import {
  sendFileToHarmony,
  SendFileToHarmonyError,
  useHarmonyDeleteFileMutation,
} from "devices/harmony/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import {
  FileManagerFile,
  FileTransferResult,
  ManageFiles,
  ManageFilesViewProps,
  TransferErrorName,
} from "devices/common/ui"
import { HarmonyManageFilesTableSection } from "./harmony-manage-files-table-section"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"
import { FileCategoryId } from "./harmony-manage-files.types"
import { HarmonyManageFilesMessages } from "./harmony-manage-files.messages"
import { OTHER_FILES_LABEL_TEXTS } from "./harmony-manage-files.config"

const mapToFileManagerFile = async (
  filePath: string
): Promise<FileManagerFile> => {
  const stats = await AppFileSystem.fileStats({
    fileAbsolutePath: filePath,
    absolute: true,
  })

  const size = stats.ok ? stats.data.size : 0

  return {
    id: filePath,
    name: path.basename(filePath),
    size: size,
    type: "file",
  }
}

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

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id
  )

  const activeFileMap = useMemo(
    () =>
      activeCategoryId
        ? (categoryFileMap[activeCategoryId as FileCategoryId] ?? {})
        : {},
    [activeCategoryId, categoryFileMap]
  )

  const openFileDialog = async (options: OpenDialogOptionsLite) => {
    const filePaths = await AppActions.openFileDialog(options)
    return filePaths.reduce(
      async (accP, filePath) => {
        const acc = await accP
        const file = await mapToFileManagerFile(filePath)
        acc.push(file)
        return acc
      },
      Promise.resolve([] as FileManagerFile[])
    )
  }

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

    const targetPath = path.join(targetDirectoryPath, params.file.name)

    try {
      const sendFileToHarmonyResponse = await sendFileToHarmony({
        device: activeDevice,
        targetPath,
        onProgress: params.onProgress,
        abortController: params.abortController,
        fileLocation: { fileAbsolutePath: params.file.id, absolute: true },
      })

      if (!sendFileToHarmonyResponse) {
        return AppResultFactory.failed(
          new AppError("", TransferErrorName.UploadUnknown)
        )
      }
      return AppResultFactory.success()
    } catch (error) {
      if (error === SendFileToHarmonyError.Aborted) {
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
        deleteFile={deleteFile}
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
