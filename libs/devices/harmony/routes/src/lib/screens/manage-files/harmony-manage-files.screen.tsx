/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"
import { AppError, AppResultFactory } from "app-utils/models"
import {
  ExecuteTransferResult,
  FailedTransferErrorName,
  TransferFileFromPathEntry,
} from "devices/common/models"
import {
  uploadFiles,
  useHarmonyDeleteFileMutation,
} from "devices/harmony/feature"
import {
  openFileDialog,
  useActiveDeviceQuery,
  useManageFilesSelection,
} from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import {
  ManageFiles,
  manageFilesMessages,
  ManageFilesViewProps,
} from "devices/common/ui"
import { HarmonyManageFilesTableSection } from "./harmony-manage-files-table-section"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"
import { HarmonyManageFilesMessages } from "./harmony-manage-files.messages"
import { OTHER_FILES_LABEL_TEXTS } from "./harmony-manage-files.config"
import { ScreenLoader } from "app-theme/ui"

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

  const sortedFiles = useMemo(() => {
    const list = activeFileMap ? Object.values(activeFileMap) : []

    return (
      list?.sort((a, b) => {
        const patterns = [
          /^\p{L}.*/u, // Compare letter values
          /^\d+$/, // Compare numeric values
          /^[^a-zA-Z\d\s@]+$/, // Compare special character values
        ]

        for (const pattern of patterns) {
          const aMatches = pattern.test(a.name)
          const bMatches = pattern.test(b.name)

          if (aMatches && !bMatches) return -1
          if (!aMatches && bMatches) return 1
        }
        return a.name.localeCompare(b.name)
      }) || []
    )
  }, [activeFileMap])

  const transferFile: ManageFilesViewProps["transferFiles"] = async (
    params
  ): Promise<ExecuteTransferResult> => {
    const targetDirectoryPath = categories.find(
      ({ id }) => id === activeCategoryId
    )?.directoryPath

    if (!activeDevice || !targetDirectoryPath) {
      return AppResultFactory.failed(
        new AppError("", FailedTransferErrorName.Unknown),
        {
          failed: params.files.map((f) => ({
            ...f,
            errorName: "Unknown",
          })),
        }
      )
    }

    const files: TransferFileFromPathEntry[] = params.files.map((file) => ({
      id: file.id,
      source: {
        type: "fileLocation",
        fileLocation: { fileAbsolutePath: file.id, absolute: true },
      },
      target: {
        type: "path",
        path: `${targetDirectoryPath}/${file.name}`,
      },
    }))

    const result = await uploadFiles({
      files,
      device: activeDevice,
      onProgress: params.onProgress,
      abortController: params.abortController,
    })

    if (result.data?.failed) {
      for (const file of result.data.failed) {
        if (file.errorName === FailedTransferErrorName.Aborted) {
          const fileToDelete = files.find((f) => f.id === file.id)
          fileToDelete && (await deleteFile(fileToDelete.target.path))
        }
      }
    }

    return result
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
      <ScreenLoader
        loading={isLoading}
        message={manageFilesMessages.loadStateText.id}
      >
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
          otherFiles={OTHER_FILES_LABEL_TEXTS}
          openFileDialog={openFileDialog}
          transferFiles={transferFile}
          messages={HarmonyManageFilesMessages}
          onTransferSuccess={refetch}
        >
          {(props) => (
            <HarmonyManageFilesTableSection files={sortedFiles} {...props} />
          )}
        </ManageFiles>
      </ScreenLoader>
    </>
  )
}
