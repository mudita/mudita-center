/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react"
import { Messages } from "app-localize/utils"
import { MfStorageSummaryProps } from "./manage-files-storage-summary"
import { MfCategoryListProps } from "./manage-files-category-list"
import {
  FileManagerFile,
  FileManagerFileMap,
  ManageFilesTableSectionProps,
} from "./manage-files.types"
import { ManageFiles } from "./manage-files"
import { ManageFilesLoadingState } from "./manage-files-loading-state"
import {
  ManageFilesDeleteFlow,
  ManageFilesDeleteFlowProps,
} from "./manage-files-delete-flow"
import { MfOtherFilesProps } from "./manage-files-other-files"
import {
  ManageFilesTransferFlow,
  ManageFilesTransferFlowProps,
} from "./manage-files-transfer-flow"

type ManageFilesViewChild = (
  ctx: Pick<ManageFilesTableSectionProps, "onSelectedChange" | "selectedIds">
) => ReactNode

type ManageFilesViewMessages =
  ManageFilesTransferFlowProps["transferFlowMessages"] &
    ManageFilesDeleteFlowProps["deleteFlowMessages"] & {
      summaryHeader: Messages
    }

export interface ManageFilesViewProps
  extends MfStorageSummaryProps,
    MfCategoryListProps,
    MfOtherFilesProps,
    Pick<ManageFilesDeleteFlowProps, "deleteFile" | "onDeleteSuccess">,
    Pick<
      ManageFilesTransferFlowProps,
      "openFileDialog" | "transferFile" | "onTransferSuccess"
    > {
  activeFileMap: FileManagerFileMap
  onActiveCategoryChange: (categoryId: string) => void
  isLoading: boolean
  children: ManageFilesViewChild
  messages: ManageFilesViewMessages
}

export const ManageFilesView: FunctionComponent<ManageFilesViewProps> = (
  props
) => {
  const {
    messages,
    activeCategoryId,
    activeFileMap,
    onActiveCategoryChange,
    deleteFile,
    onDeleteSuccess,
    transferFile,
    onTransferSuccess,
    openFileDialog,
    isLoading,
    categories,
    segments,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
    otherFiles,
    children,
  } = props
  const activeSupportedFileTypes = useMemo(() => {
    return (
      categories.find((c) => c.id === activeCategoryId)?.supportedFileTypes ||
      []
    )
  }, [activeCategoryId, categories])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  const [deleteFlowOpened, setDeleteFlowOpened] = useState(false)

  const [uploadFlowOpened, setUploadFlowOpened] = useState(false)

  const selectedFiles: FileManagerFile[] = useMemo(() => {
    const out: FileManagerFile[] = []
    selectedIds.forEach((id) => {
      const file = activeFileMap[id]
      if (file) out.push(file)
    })
    return out
  }, [selectedIds, activeFileMap])

  const updateSelection = useCallback((fileId: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      checked ? next.add(fileId) : next.delete(fileId)
      return next
    })
  }, [])

  const applySelectAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(() =>
        checked ? new Set(Object.keys(activeFileMap)) : new Set()
      )
    },
    [activeFileMap]
  )

  const startDeleteFlow = useCallback(() => {
    setDeleteFlowOpened(true)
  }, [])

  const changeCategory = useCallback(
    (categoryId: string) => {
      if (categoryId === activeCategoryId) {
        return
      }
      setSelectedIds(new Set())
      onActiveCategoryChange(categoryId)
    },
    [activeCategoryId, onActiveCategoryChange]
  )

  const loadingState =
    (isLoading && !deleteFlowOpened) || activeCategoryId === undefined

  const finalizeDeleteSuccess = useCallback(async () => {
    onDeleteSuccess && (await onDeleteSuccess())
    setSelectedIds(new Set())
    setDeleteFlowOpened(false)
  }, [onDeleteSuccess])

  const handlePartialDeleteFailure = useCallback(
    async (failedFiles: FileManagerFile[]) => {
      if (failedFiles.length === selectedFiles.length) {
        setDeleteFlowOpened(false)
      } else {
        setDeleteFlowOpened(false)
        onDeleteSuccess && (await onDeleteSuccess())
        setSelectedIds(() => {
          const next = new Set<string>()
          failedFiles.forEach((file) => next.add(file.id))
          return next
        })
      }
    },
    [onDeleteSuccess, selectedFiles.length]
  )

  const finalizeTransferSuccess = useCallback(async () => {
    onTransferSuccess && (await onTransferSuccess())
    setUploadFlowOpened(false)
  }, [onTransferSuccess])

  const handlePartialTransferFailure = useCallback(async () => {
    setUploadFlowOpened(false)
    onTransferSuccess && (await onTransferSuccess())
  }, [onTransferSuccess])

  const startUploadFlow = useCallback(() => {
    setUploadFlowOpened(true)
  }, [])

  return (
    <>
      <ManageFilesLoadingState opened={loadingState} />
      <ManageFiles
        opened={!loadingState}
        segments={segments}
        categories={categories}
        activeCategoryId={activeCategoryId}
        messages={messages}
        freeSpaceBytes={freeSpaceBytes}
        usedSpaceBytes={usedSpaceBytes}
        otherSpaceBytes={otherSpaceBytes}
        otherFiles={otherFiles}
        selectedFiles={selectedFiles}
        onCategoryClick={changeCategory}
        onAllCheckboxClick={applySelectAll}
        onDeleteClick={startDeleteFlow}
        onAddFileClick={startUploadFlow}
      >
        {children({ onSelectedChange: updateSelection, selectedIds })}
      </ManageFiles>
      <ManageFilesDeleteFlow
        opened={deleteFlowOpened}
        onClose={() => setDeleteFlowOpened(false)}
        selectedFiles={selectedFiles}
        onDeleteSuccess={finalizeDeleteSuccess}
        onPartialDeleteFailure={handlePartialDeleteFailure}
        deleteFile={deleteFile}
        deleteFlowMessages={messages}
      />
      <ManageFilesTransferFlow
        opened={uploadFlowOpened}
        onClose={() => setUploadFlowOpened(false)}
        openFileDialog={openFileDialog}
        onTransferSuccess={finalizeTransferSuccess}
        onPartialTransferFailure={handlePartialTransferFailure}
        transferFile={transferFile}
        transferFlowMessages={messages}
        fileMap={activeFileMap}
        freeSpaceBytes={freeSpaceBytes}
        supportedFileTypes={activeSupportedFileTypes}
      />
    </>
  )
}
