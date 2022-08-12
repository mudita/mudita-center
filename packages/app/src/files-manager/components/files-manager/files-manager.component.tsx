/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { State } from "App/core/constants"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { FilesManagerContainer } from "App/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import {
  DiskSpaceCategory,
  FilesManagerProps,
  FileServiceState,
} from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"
import {
  DiskSpaceCategoryType,
  DeviceDirectory,
  filesSummaryElements,
} from "App/files-manager/constants"
import FilesStorage from "App/files-manager/components/files-storage/files-storage.component"
import { DeleteFilesModals } from "App/files-manager/components/delete-files-modals/delete-files-modals.component"
import { useLoadingState } from "App/ui"
import { noop } from "lodash"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"

const messages = defineMessages({
  uploadingModalTitle: { id: "module.filesManager.uploadingModalTitle" },
  uploadingModalSubtitle: { id: "module.filesManager.uploadingModalSubtitle" },
  uploadingModalBody: { id: "module.filesManager.uploadingModalBody" },
})

const FilesManager: FunctionComponent<FilesManagerProps> = ({
  memorySpace = {
    free: 0,
    full: 0,
    total: 0,
  },
  loading,
  uploading,
  files,
  getFiles,
  uploadFile,
  deviceType,
  error,
  resetAllItems,
  selectAllItems,
  toggleItem,
  selectedItems,
  allItemsSelected,
  onDeleteFiles = noop,
}) => {
  const { states, updateFieldState } = useLoadingState<FileServiceState>({
    creating: false,
    creatingInfo: false,
    updating: false,
    updatingInfo: false,
    deleting: false,
    deletingConfirmation: false,
    deletingInfo: false,
    updatingOrder: false,
    updatingOrderInfo: false,
  })
  const [deletedFiles, setDeletedFiles] = useState<string[]>([])
  const { free, total } = memorySpace
  const systemMemory = total - free

  const downloadFiles = () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    if (deviceType === DeviceType.MuditaPure) {
      getFiles(DeviceDirectory.Music)
    } else {
      getFiles(DeviceDirectory.Relaxation)
    }
  }
  useEffect(() => {
    if (deviceType) {
      void downloadFiles()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType])

  const diskSpaceCategories: DiskSpaceCategory[] = filesSummaryElements.map(
    (element) => {
      if (element.type === DiskSpaceCategoryType.Free) {
        return {
          ...element,
          size: free,
        }
      }
      if (element.type === DiskSpaceCategoryType.UsedSpace) {
        return {
          ...element,
          size: systemMemory,
        }
      }
      return element
    }
  )
  const handleOpenDeleteModal = (ids: string[]) => {
    updateFieldState("deletingConfirmation", true)
    setDeletedFiles(ids)
  }
  const handleDeleteSelected = () => {
    handleOpenDeleteModal(selectedItems)
  }
  const handleCloseDeletingErrorModal = () => {
    updateFieldState("deleting", false)
    setDeletedFiles([])
    resetAllItems()
  }
  const handleCloseDeleteModal = () => {
    updateFieldState("deletingConfirmation", false)
    setDeletedFiles([])
    resetAllItems()
  }
  const handleConfirmFilesDelete = () => {
    updateFieldState("deleting", true)
    updateFieldState("deletingConfirmation", false)
    resetAllItems()
    onDeleteFiles()
  }
  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      {uploading === State.Loading && (
        <LoaderModal
          testId={FilesManagerTestIds.UploadingModal}
          open={uploading === State.Loading}
          title={intl.formatMessage(messages.uploadingModalTitle)}
          subtitle={intl.formatMessage(messages.uploadingModalSubtitle)}
          body={intl.formatMessage(messages.uploadingModalBody)}
        />
      )}
      <FilesSummary
        diskSpaceCategories={diskSpaceCategories}
        totalMemorySpace={total}
        systemMemory={systemMemory}
      />
      <FilesStorage
        state={loading}
        files={files}
        selectAllItems={selectAllItems}
        resetAllItems={resetAllItems}
        selectedItems={selectedItems}
        allItemsSelected={allItemsSelected}
        toggleItem={toggleItem}
        onDeleteClick={handleOpenDeleteModal}
        onDeleteSelected={handleDeleteSelected}
        uploadFiles={uploadFile}
      />
      <DeleteFilesModals
        deletedFilesLength={deletedFiles.length}
        deletingConfirmation={states.deletingConfirmation}
        deleting={states.deleting}
        deletingInfo={states.deletingInfo}
        error={error}
        onCloseDeletingModal={handleCloseDeleteModal}
        onCloseDeletingErrorModal={handleCloseDeletingErrorModal}
        onDelete={handleConfirmFilesDelete}
      />
    </FilesManagerContainer>
  )
}

export default FilesManager
