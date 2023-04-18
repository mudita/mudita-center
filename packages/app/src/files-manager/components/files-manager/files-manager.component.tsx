/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import React, { useEffect, useState } from "react"
import { State } from "App/core/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { FilesManagerContainer } from "App/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "App/files-manager/components/files-summary/files-summary.component"
import {
  DiskSpaceCategory,
  FileServiceState,
  FilesManagerProps,
} from "App/files-manager/components/files-manager/files-manager.interface"
import { FilesManagerTestIds } from "App/files-manager/components/files-manager/files-manager-test-ids.enum"
import {
  DeviceDirectory,
  DiskSpaceCategoryType,
  filesSummaryElements,
} from "App/files-manager/constants"
import FilesStorage from "App/files-manager/components/files-storage/files-storage.component"
import { DeleteFilesModals } from "App/files-manager/components/delete-files-modals/delete-files-modals.component"
import { useLoadingState } from "App/ui"
import { UploadFilesModals } from "App/files-manager/components/upload-files-modals/upload-files-modals.component"
import { useFilesFilter } from "App/files-manager/helpers/use-files-filter.hook"
import { getSpaces } from "App/files-manager/components/files-manager/get-spaces.helper"

const FilesManager: FunctionComponent<FilesManagerProps> = ({
  memorySpace = {
    reservedSpace: 0,
    usedUserSpace: 0,
    total: 0,
  },
  loading,
  uploading,
  deleting,
  files,
  getFiles,
  uploadFile,
  deviceType,
  resetAllItems,
  selectAllItems,
  toggleItem,
  selectedItems,
  allItemsSelected,
  deleteFiles,
  resetDeletingState,
  resetUploadingState,
  resetUploadingStateAfterSuccess,
  uploadingFileCount,
  deletingFileCount,
  uploadBlocked,
  error,
  setDeletingFileCount,
  pendingFilesCount,
  abortPendingUpload,
  continuePendingUpload,
}) => {
  const { noFoundFiles, searchValue, filteredFiles, handleSearchValueChange } =
    useFilesFilter({ files })
  const { states, updateFieldState } = useLoadingState<FileServiceState>({
    deletingFailed: false,
    deleting: false,
    deletingConfirmation: false,
    deletingInfo: false,
    uploading: false,
    uploadingInfo: false,
    uploadingFailed: false,
  })
  const [toDeleteFileIds, setToDeleteFileIds] = useState<string[]>([])
  const {
    reservedSpace,
    freeSpace,
    totalMemorySpace,
    usedMemorySpace,
    otherSpace,
    musicSpace,
  } = getSpaces(files, memorySpace)

  const disableUpload = uploadBlocked ? uploadBlocked : freeSpace === 0

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

  useEffect(() => {
    if (deleting === State.Initial) {
      updateFieldState("deletingInfo", false)
      updateFieldState("deletingFailed", false)
    } else if (deleting === State.Loading) {
      updateFieldState("deleting", true)
      updateFieldState("deletingConfirmation", false)
    } else if (deleting === State.Loaded) {
      updateFieldState("deleting", false)
      updateFieldState("uploadingInfo", false)
      updateFieldState("deletingInfo", true)
    } else if (deleting === State.Failed) {
      updateFieldState("deleting", false)
      updateFieldState("deletingFailed", true)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleting])

  useEffect(() => {
    if (uploading === State.Initial) {
      updateFieldState("uploadingInfo", false)
      updateFieldState("uploadingFailed", false)
    } else if (uploading === State.Loading) {
      updateFieldState("uploading", true)
    } else if (uploading === State.Loaded) {
      updateFieldState("uploading", false)
      updateFieldState("deletingInfo", false)
      updateFieldState("uploadingInfo", true)
    } else if (uploading === State.Failed) {
      updateFieldState("uploading", false)
      updateFieldState("uploadingFailed", true)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploading])

  useEffect(() => {
    if (!states.deletingInfo) {
      return
    }

    const hideInfoPopupsTimeout = setTimeout(() => {
      updateFieldState("deletingInfo", false)
      resetDeletingState()
    }, 5000)

    return () => {
      resetDeletingState()
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.deletingInfo])

  useEffect(() => {
    if (!states.uploadingInfo) {
      return
    }

    const hideInfoPopupsTimeout = setTimeout(() => {
      updateFieldState("uploadingInfo", false)
      resetUploadingStateAfterSuccess()
    }, 5000)

    return () => {
      resetUploadingState()
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.uploadingInfo])

  const getDiskSpaceCategories = (element: DiskSpaceCategory) => {
    const elements = {
      [DiskSpaceCategoryType.Free]: {
        ...element,
        size: freeSpace,
      },
      [DiskSpaceCategoryType.System]: {
        ...element,
        size: reservedSpace,
      },
      [DiskSpaceCategoryType.Music]: {
        ...element,
        size: musicSpace,
        filesAmount: files.length,
      },
      [DiskSpaceCategoryType.OtherSpace]: {
        ...element,
        size: otherSpace,
      },
    }
    return elements[element.type]
  }

  const diskSpaceCategories: DiskSpaceCategory[] = filesSummaryElements.map(
    (element) => {
      return getDiskSpaceCategories(element)
    }
  )
  const openDeleteModal = (ids: string[]) => {
    updateFieldState("deletingInfo", false)
    updateFieldState("uploadingInfo", false)
    updateFieldState("deletingConfirmation", true)
    setToDeleteFileIds(ids)
    setDeletingFileCount(ids.length)
  }

  const handleDeleteClick = (ids: string[]) => {
    openDeleteModal(ids)
    resetAllItems()
  }
  const handleManagerDeleteClick = () => {
    openDeleteModal(selectedItems)
  }
  const handleCloseUploadingErrorModal = () => {
    updateFieldState("uploadingFailed", false)
    resetUploadingState()
  }
  const handleCloseDeletingConfirmationModal = () => {
    updateFieldState("deletingConfirmation", false)
    setToDeleteFileIds([])
    setDeletingFileCount(0)
  }
  const handleConfirmFilesDelete = () => {
    resetAllItems()
    void deleteFiles(toDeleteFileIds)
  }
  const handleCloseDeletingErrorModal = () => {
    setToDeleteFileIds([])
    setDeletingFileCount(0)
    resetDeletingState()
  }
  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <UploadFilesModals
        error={error}
        filesLength={uploadingFileCount}
        uploading={states.uploading}
        uploadingInfo={states.uploadingInfo}
        uploadingFailed={states.uploadingFailed}
        onCloseUploadingErrorModal={handleCloseUploadingErrorModal}
        pendingFilesCount={pendingFilesCount}
        pendingUpload={uploading === State.Pending}
        onAbortPendingUpload={abortPendingUpload}
        onContinuePendingUpload={continuePendingUpload}
      />
      <DeleteFilesModals
        filesLength={deletingFileCount}
        deletingConfirmation={states.deletingConfirmation}
        deleting={states.deleting}
        deletingInfo={states.deletingInfo}
        deletingFailed={states.deletingFailed}
        onCloseDeletingConfirmationModal={handleCloseDeletingConfirmationModal}
        onCloseDeletingErrorModal={handleCloseDeletingErrorModal}
        onDelete={handleConfirmFilesDelete}
      />
      <FilesSummary
        diskSpaceCategories={diskSpaceCategories}
        totalMemorySpace={totalMemorySpace}
        usedMemory={usedMemorySpace}
        uploading={states.uploading}
      />
      {deviceType !== null && (
        <FilesStorage
          state={loading}
          files={filteredFiles}
          selectAllItems={selectAllItems}
          resetAllItems={resetAllItems}
          selectedItems={selectedItems}
          allItemsSelected={allItemsSelected}
          toggleItem={toggleItem}
          onDeleteClick={handleDeleteClick}
          onManagerDeleteClick={handleManagerDeleteClick}
          uploadFiles={uploadFile}
          searchValue={searchValue}
          onSearchValueChange={handleSearchValueChange}
          noFoundFiles={noFoundFiles}
          disableUpload={disableUpload}
          deviceType={deviceType}
        />
      )}
    </FilesManagerContainer>
  )
}

export default FilesManager
