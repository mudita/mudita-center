/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device/constants"
import React, { useEffect, useRef, useState } from "react"
import { State } from "Core/core/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { FilesManagerContainer } from "Core/files-manager/components/files-manager/files-manager.styled"
import FilesSummary from "Core/files-manager/components/files-summary/files-summary.component"
import {
  DiskSpaceCategory,
  FileServiceState,
  FilesManagerProps,
} from "Core/files-manager/components/files-manager/files-manager.interface"
import { FilesManagerTestIds } from "Core/files-manager/components/files-manager/files-manager-test-ids.enum"
import {
  DeviceDirectory,
  DiskSpaceCategoryType,
  filesSummaryElements,
} from "Core/files-manager/constants"
import FilesStorage from "Core/files-manager/components/files-storage/files-storage.component"
import { DeleteFilesModals } from "Core/files-manager/components/delete-files-modals/delete-files-modals.component"
import { useLoadingState } from "Core/ui"
import { UploadFilesModals } from "Core/files-manager/components/upload-files-modals/upload-files-modals.component"
import { useFilesFilter } from "Core/files-manager/helpers/use-files-filter.hook"
import { getSpaces } from "Core/files-manager/components/files-manager/get-spaces.helper"
import { useDispatch } from "react-redux"
import { resetFiles } from "Core/files-manager/actions/base.action"
import useCancelableFileUpload from "Core/files-manager/components/files-manager/use-cancelable-file-upload"

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
  const uploadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { noFoundFiles, searchValue, filteredFiles, handleSearchValueChange } =
    useFilesFilter({ files: files ?? [] })
  const { states, updateFieldState } = useLoadingState<FileServiceState>({
    deletingFailed: false,
    deleting: false,
    deletingConfirmation: false,
    deletingInfo: false,
    uploading: false,
    uploadingInfo: false,
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
  const dispatch = useDispatch()
  const { handleUploadFiles } = useCancelableFileUpload()
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
    return () => {
      dispatch(resetFiles())
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    } else if (uploading === State.Loading) {
      updateFieldState("uploading", true)
    } else if (uploading === State.Loaded) {
      updateFieldState("uploading", false)
      updateFieldState("deletingInfo", false)
      if (uploadingFileCount) {
        updateFieldState("uploadingInfo", true)
      }
    } else if (uploading === State.Pending) {
      updateFieldState("uploadingInfo", false)
      clearTimeout(uploadTimeoutRef.current || undefined)
    } else if (uploading === State.Failed) {
      updateFieldState("uploading", false)
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
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.deletingInfo])

  useEffect(() => {
    return () => resetDeletingState()
  }, [resetDeletingState])

  useEffect(() => {
    if (!states.uploadingInfo) {
      return
    }

    uploadTimeoutRef.current = setTimeout(() => {
      updateFieldState("uploadingInfo", false)
      resetUploadingStateAfterSuccess()
    }, 5000)

    return () => {
      clearTimeout(uploadTimeoutRef.current || undefined)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.uploadingInfo])

  useEffect(() => {
    return () => {
      resetUploadingState()
    }
  }, [resetUploadingState])

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
        filesAmount: files?.length ?? 0,
      },
      [DiskSpaceCategoryType.OtherSpace]: {
        ...element,
        size: otherSpace,
      },
    }
    return elements[element.type]
  }

  const diskSpaceCategories: DiskSpaceCategory[] | null =
    files &&
    filesSummaryElements.map((element) => {
      return getDiskSpaceCategories(element)
    })
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
      {diskSpaceCategories && (
        <FilesSummary
          diskSpaceCategories={diskSpaceCategories}
          totalMemorySpace={totalMemorySpace}
          usedMemory={usedMemorySpace}
        />
      )}
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
          uploadFiles={handleUploadFiles}
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