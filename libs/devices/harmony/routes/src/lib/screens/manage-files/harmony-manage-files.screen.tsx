/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { FunctionComponent, useMemo, useState } from "react"
import { defineMessages, formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"
import { AppActions } from "app-utils/renderer"
import { OpenDialogOptionsLite } from "app-utils/models"
import { useHarmonyDeleteFileMutation } from "devices/harmony/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { Harmony } from "devices/harmony/models"
import { FileManagerFile, ManageFilesView } from "devices/common/ui"
import { HarmonyManageFilesTableSection } from "./harmony-manage-files-table-section"
import { useHarmonyManageFiles } from "./use-harmony-manage-files"
import { FileCategoryId } from "./harmony-manage-files.types"
import { handleTransferMock } from "./handle-transfer-mock"

const messages = defineMessages({
  pageTitle: {
    id: "page.manageFiles.title",
  },
  summaryHeader: {
    id: "harmony.manageFiles.summary.header",
  },
  confirmDeleteModalTitle: {
    id: "harmony.manageFiles.confirmDelete.modal.title",
  },
  confirmDeleteModalDescription: {
    id: "harmony.manageFiles.confirmDelete.modal.description",
  },
  confirmDeleteModalPrimaryButtonText: {
    id: "harmony.manageFiles.confirmDelete.modal.primaryButtonText",
  },
  confirmDeleteModalSecondaryButtonText: {
    id: "harmony.manageFiles.confirmDelete.modal.secondaryButtonText",
  },
  otherFilesSystemLabelText: {
    id: "harmony.manageFiles.otherFilesSystemLabelText",
  },
  otherFilesOtherLabelText: {
    id: "harmony.manageFiles.otherFilesOtherLabelText",
  },
  deleteFailedAllModalTitle: {
    id: "harmony.manageFiles.deleteFailed.all.modal.title",
  },
  deleteFailedSomeModalTitle: {
    id: "harmony.manageFiles.deleteFailed.some.modal.title",
  },
  deleteFailedAllModalDescription: {
    id: "harmony.manageFiles.deleteFailed.all.modal.description",
  },
  deleteFailedDescriptionModalDescription: {
    id: "harmony.manageFiles.deleteFailed.some.modal.description",
  },
  deleteFailedModalSecondaryButtonText: {
    id: "harmony.manageFiles.deleteFailed.modal.secondaryButtonText",
  },
  uploadValidationFailureModalTitle: {
    id: "harmony.manageFiles.upload.validationFailure.modalTitle",
  },
  uploadValidationFailureDuplicatesDescription: {
    id: "harmony.manageFiles.upload.validationFailure.duplicatesDescription",
  },
  uploadValidationFailureInsufficientMemoryDescription: {
    id: "harmony.manageFiles.upload.validationFailure.insufficientMemoryDescription",
  },
  uploadValidationFailureFileTooLargeDescription: {
    id: "harmony.manageFiles.upload.validationFailure.fileTooLargeDescription",
  },
  uploadValidationFailureModalCloseButtonText: {
    id: "harmony.manageFiles.deleteFailed.modal.secondaryButtonText",
  },
  uploadFailedAllModalTitle: {
    id: "harmony.manageFiles.uploadFailed.all.modal.title",
  },
  uploadFailedSomeModalTitle: {
    id: "harmony.manageFiles.uploadFailed.some.modal.title",
  },
  uploadFailedAllModalDescription: {
    id: "harmony.manageFiles.uploadFailed.all.modal.description",
  },
  uploadFailedSomeModalDescription: {
    id: "harmony.manageFiles.uploadFailed.some.modal.description",
  },
  uploadFailedModalCloseButtonText: {
    id: "harmony.manageFiles.uploadFailed.modal.closeButtonText",
  },
  uploadFailedAllUnknownError: {
    id: "harmony.manageFiles.uploadFailed.all.unknownError",
  },
  uploadFailedAllDuplicatesError: {
    id: "harmony.manageFiles.uploadFailed.all.duplicatesError",
  },
  uploadFailedAllNotEnoughMemoryError: {
    id: "harmony.manageFiles.uploadFailed.all.notEnoughMemoryError",
  },
  uploadFailedAllFileTooLargeError: {
    id: "harmony.manageFiles.uploadFailed.all.fileTooLargeError",
  },
  uploadFailedErrorLabelUploadUnknown: {
    id: "harmony.manageFiles.uploadFailed.errorLabels.upload.unknown",
  },
  exportFailedErrorLabelExportUnknown: {
    id: "harmony.manageFiles.exportFailed.errorLabels.export.unknown",
  },
  uploadFailedErrorLabelDuplicate: {
    id: "harmony.manageFiles.uploadFailed.errorLabels.duplicate",
  },
  uploadFailedErrorLabelCancelled: {
    id: "harmony.manageFiles.uploadFailed.errorLabels.cancelled",
  },
  uploadFailedErrorLabelTooBig: {
    id: "harmony.manageFiles.uploadFailed.errorLabels.tooBig",
  },
  uploadFailedErrorLabelFileTooLarge: {
    id: "harmony.manageFiles.uploadFailed.errorLabels.fileTooLarge",
  },
})

const mapToFileManagerFile = async (
  filePath: string
): Promise<FileManagerFile> => {
  // const stats = await AppFileSystem.stats(filePath)
  // const size = stats.ok ? stats.data.size : 0
  const size = 0
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

  const handleOpenFileDialog = async (options: OpenDialogOptionsLite) => {
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

  const handleTransfer = handleTransferMock

  return (
    <>
      <DashboardHeaderTitle title={formatMessage(messages.pageTitle)} />
      <ManageFilesView
        activeCategoryId={activeCategoryId}
        activeFileMap={activeFileMap}
        onActiveCategoryChange={setActiveCategoryId}
        segments={segments}
        categories={categories}
        freeSpaceBytes={freeSpaceBytes}
        usedSpaceBytes={usedSpaceBytes}
        otherSpaceBytes={otherSpaceBytes}
        handleDeleteFile={deleteFile}
        onDeleteSuccess={refetch}
        isLoading={isLoading}
        otherFiles={[
          { name: formatMessage(messages.otherFilesSystemLabelText) },
          { name: formatMessage(messages.otherFilesOtherLabelText) },
        ]}
        openFileDialog={handleOpenFileDialog}
        handleTransfer={handleTransfer}
        messages={messages}
        onTransferSuccess={refetch}
      >
        {(props) => (
          <HarmonyManageFilesTableSection fileMap={activeFileMap} {...props} />
        )}
      </ManageFilesView>
    </>
  )
}
