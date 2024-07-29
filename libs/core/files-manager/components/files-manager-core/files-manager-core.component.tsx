/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  FunctionComponent,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { State } from "Core/core/constants"
import { FilesManagerContainer } from "Core/files-manager/components/files-manager-core/files-manager.styled"
import FilesSummary from "Core/files-manager/components/files-summary/files-summary.component"
import {
  DiskSpaceCategory,
  FileServiceState,
  MemorySpace,
} from "Core/files-manager/components/files-manager-core/files-manager.interface"
import { FilesManagerTestIds } from "Core/files-manager/components/files-manager-core/files-manager-test-ids.enum"
import { DeleteFilesModals } from "Core/files-manager/components/delete-files-modals/delete-files-modals.component"
import { useLoadingState } from "Core/ui"
import { UploadFilesModals } from "Core/files-manager/components/upload-files-modals/upload-files-modals.component"
import useSpaces from "Core/files-manager/components/files-manager-core/use-spaces/use-spaces.hook"
import {
  resetDeletingState,
  resetFiles,
  resetUploadingState,
  resetUploadingStateAfterSuccess,
  setDeletingFileCount,
} from "Core/files-manager/actions/base.action"
import useDiskSpaceCategories from "Core/files-manager/components/files-manager-core/use-disk-space-categories.hook"
import { getFiles, resetAllItems } from "Core/files-manager/actions"
import { deleteFiles } from "Core/files-manager/actions/delete-files.action"
import getAllFilesSelector from "Core/files-manager/selectors/get-all-files.selector"
import { FilesStorageProps } from "Core/files-manager/components/files-storage/files-storage.interface"
import { Message } from "Core/__deprecated__/renderer/interfaces/message.interface"

type Props = {
  children: (props: FilesStorageProps) => ReactNode
  filesSummaryElements: DiskSpaceCategory[]
  summaryTitleMessage: Message
}

const FilesManagerCore: FunctionComponent<Props> = ({
  children,
  filesSummaryElements,
  summaryTitleMessage,
}) => {
  const dispatch = useDispatch<Dispatch>()
  const {
    memorySpace,
    files,
    loading,
    deleting,
    uploading,
    uploadingFileCount,
    deletingFileCount,
    error,
    selectedItems,
    uploadBlocked,
  } = useSelector((state: ReduxRootState) => ({
    memorySpace: state.device.data?.memorySpace ?? {
      reservedSpace: 0,
      usedUserSpace: 0,
      total: 0,
    },
    files: getAllFilesSelector(state),
    loading: state.filesManager.loading,
    deleting: state.filesManager.deleting,
    uploading: state.filesManager.uploading,
    uploadingFileCount: state.filesManager.uploadingFileCount,
    deletingFileCount: state.filesManager.deletingFileCount,
    error: state.filesManager.error,
    selectedItems: state.filesManager.selectedItems.rows,
    uploadBlocked: state.filesManager.uploadBlocked,
  }))

  const uploadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { states, updateFieldState } = useLoadingState<FileServiceState>({
    deletingFailed: false,
    deleting: false,
    deletingConfirmation: false,
    deletingInfo: false,
    uploading: false,
    uploadingInfo: false,
  })
  const [toDeleteFileIds, setToDeleteFileIds] = useState<string[]>([])
  const spaces = useSpaces(files, memorySpace as MemorySpace, loading)
  const diskSpaceCategories = useDiskSpaceCategories(
    files,
    spaces,
    filesSummaryElements
  )
  const { freeSpace, totalMemorySpace, usedMemorySpace } = spaces

  const disableUpload = uploadBlocked ? uploadBlocked : freeSpace === 0

  useEffect(() => {
    return () => {
      dispatch(resetFiles())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getFiles())
  }, [dispatch])

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
      dispatch(resetDeletingState())
    }, 5000)

    return () => {
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.deletingInfo, dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetDeletingState())
    }
  }, [dispatch])

  useEffect(() => {
    if (!states.uploadingInfo) {
      return
    }

    uploadTimeoutRef.current = setTimeout(() => {
      updateFieldState("uploadingInfo", false)
      dispatch(resetUploadingStateAfterSuccess())
    }, 5000)

    return () => {
      clearTimeout(uploadTimeoutRef.current || undefined)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.uploadingInfo])

  useEffect(() => {
    return () => {
      dispatch(resetUploadingState())
    }
  }, [dispatch])

  const openDeleteModal = (ids: string[]) => {
    updateFieldState("deletingInfo", false)
    updateFieldState("uploadingInfo", false)
    updateFieldState("deletingConfirmation", true)
    setToDeleteFileIds(ids)
    dispatch(setDeletingFileCount(ids.length))
  }

  const handleDeleteClick = (ids: string[]) => {
    openDeleteModal(ids)
    dispatch(resetAllItems())
  }
  const handleManagerDeleteClick = () => {
    openDeleteModal(selectedItems)
  }
  const handleCloseUploadingErrorModal = () => {
    dispatch(resetUploadingState())
  }
  const handleCloseDeletingConfirmationModal = () => {
    updateFieldState("deletingConfirmation", false)
    setToDeleteFileIds([])
    dispatch(setDeletingFileCount(0))
  }
  const handleConfirmFilesDelete = () => {
    dispatch(resetAllItems())
    dispatch(deleteFiles(toDeleteFileIds))
  }
  const handleCloseDeletingErrorModal = () => {
    setToDeleteFileIds([])
    dispatch(setDeletingFileCount(0))
    dispatch(resetDeletingState())
  }

  return (
    <FilesManagerContainer data-testid={FilesManagerTestIds.Container}>
      <UploadFilesModals
        error={error}
        filesLength={uploadingFileCount}
        uploading={states.uploading}
        uploadingInfo={states.uploadingInfo}
        onCloseUploadingErrorModal={handleCloseUploadingErrorModal}
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
          summaryTitleMessage={summaryTitleMessage}
          diskSpaceCategories={diskSpaceCategories}
          totalMemorySpace={totalMemorySpace}
          usedMemory={usedMemorySpace}
        />
      )}
      {children({
        state: loading,
        disableUpload: disableUpload,
        onDeleteClick: handleDeleteClick,
        onManagerDeleteClick: handleManagerDeleteClick,
      })}
    </FilesManagerContainer>
  )
}

export default FilesManagerCore
