/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
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
  uploadingFileLength,
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
  const { reservedSpace, usedUserSpace, total } = memorySpace
  const free = total - reservedSpace - usedUserSpace
  const usedMemory = reservedSpace + usedUserSpace
  const musicSpace = files.reduce((a, b) => a + b.size, 0)
  const otherSpace = usedUserSpace - musicSpace

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
      resetUploadingState()
    }, 5000)

    return () => {
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.uploadingInfo])

  const getDiskSpaceCategories = (element: DiskSpaceCategory) => {
    const elements = {
      [DiskSpaceCategoryType.Free]: {
        ...element,
        size: free,
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
  }
  const handleConfirmFilesDelete = () => {
    resetAllItems()
    void deleteFiles(toDeleteFileIds)
  }
  const handleCloseDeletingErrorModal = () => {
    setToDeleteFileIds([])
    resetDeletingState()
  }
  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <UploadFilesModals
        filesLength={uploadingFileLength}
        uploading={states.uploading}
        uploadingInfo={states.uploadingInfo}
        uploadingFailed={states.uploadingFailed}
        onCloseUploadingErrorModal={handleCloseUploadingErrorModal}
      />
      <DeleteFilesModals
        filesLength={toDeleteFileIds.length}
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
        totalMemorySpace={total}
        usedMemory={usedMemory}
      />
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
      />
    </FilesManagerContainer>
  )
}

export default FilesManager
