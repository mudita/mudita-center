/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { Messages } from "app-localize/utils"
import {
  GenericDeleteFlow,
  GenericDeleteFlowProps,
  LoadingState,
} from "app-theme/ui"
import { ManageFilesStorageSummaryProps } from "./manage-files-content/manage-files-storage-summary"
import { ManageFilesCategoryListProps } from "./manage-files-content/manage-files-category-list"
import { ManageFilesContent } from "./manage-files-content/manage-files-content"
import { ManageFilesOtherFilesProps } from "./manage-files-content/manage-files-other-files"
import {
  ManageFilesTransferFlow,
  ManageFilesTransferFlowProps,
} from "./manage-files-transfer-flow/manage-files-transfer-flow"
import {
  FileManagerFile,
  FileManagerFileMap,
  ManageFilesTableSectionProps,
} from "./manage-files.types"
import { manageFilesMessages } from "./manage-files.messages"
import { ManageFilesFileListEmptyProps } from "./manage-files-content/manage-files-file-list-empty"
import { FileListPanelHeaderProps } from "./manage-files-content/manage-files-file-list-panel"
import {
  ManageFilesDownloadFlow,
  ManageFilesDownloadFlowProps,
} from "./manage-files-transfer-flow/manage-files-download-flow"

type ManageFilesViewChild = (
  ctx: Pick<ManageFilesTableSectionProps, "onSelectedChange" | "selectedIds">
) => ReactNode

type ManageFilesViewMessages =
  ManageFilesTransferFlowProps["transferFlowMessages"] &
    ManageFilesStorageSummaryProps["messages"] &
    ManageFilesFileListEmptyProps["messages"] &
    FileListPanelHeaderProps["messages"] &
    GenericDeleteFlowProps["deleteFlowMessages"] & {
      summaryHeader: Messages
    }

export interface ManageFilesViewProps
  extends ManageFilesStorageSummaryProps,
    ManageFilesCategoryListProps,
    ManageFilesOtherFilesProps,
    Pick<
      ManageFilesTransferFlowProps,
      "openFileDialog" | "transferFiles" | "onTransferSuccess"
    >,
    Partial<Pick<ManageFilesDownloadFlowProps, "openDirectoryDialog">> {
  activeFileMap: FileManagerFileMap
  onActiveCategoryChange: (categoryId: string) => void
  isLoading: boolean
  children: ManageFilesViewChild
  messages: ManageFilesViewMessages
  deleteFiles: GenericDeleteFlowProps["deleteItemsAction"]
  onDeleteSuccess?: VoidFunction
  progress?: number
}

export const ManageFiles: FunctionComponent<ManageFilesViewProps> = (props) => {
  const {
    messages,
    activeCategoryId,
    activeFileMap,
    onActiveCategoryChange,
    deleteFiles,
    onDeleteSuccess,
    transferFiles,
    onTransferSuccess,
    openFileDialog,
    openDirectoryDialog,
    isLoading,
    categories,
    segments,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
    otherFiles,
    children,
    progress,
  } = props
  const genericDeleteRef = useRef<GenericDeleteFlow>(null)

  const activeSupportedFileTypes = useMemo(() => {
    return (
      categories.find(({ id }) => id === activeCategoryId)
        ?.supportedFileTypes || []
    )
  }, [activeCategoryId, categories])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  const [uploadFlowOpened, setUploadFlowOpened] = useState(false)
  const [downloadFlowOpened, setDownloadFlowOpened] = useState(false)

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
    genericDeleteRef.current?.deleteItems(selectedFiles)
  }, [selectedFiles])

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

  const loadingState = isLoading || activeCategoryId === undefined

  const finalizeDeleteSuccess: NonNullable<
    GenericDeleteFlowProps["onDeleteSuccess"]
  > = useCallback(
    async ({ failedItems }) => {
      void onDeleteSuccess?.()

      if (failedItems) {
        setSelectedIds(new Set(failedItems.map((item) => item.id)))
      } else {
        setSelectedIds(new Set([]))
      }
    },
    [onDeleteSuccess]
  )

  const finalizeTransferSuccess = useCallback(async () => {
    onTransferSuccess && (await onTransferSuccess())
    setUploadFlowOpened(false)
    setDownloadFlowOpened(false)
    setSelectedIds(new Set([]))
  }, [onTransferSuccess])

  const handlePartialTransferFailure = useCallback(async () => {
    setUploadFlowOpened(false)
    onTransferSuccess && (await onTransferSuccess())
  }, [onTransferSuccess])

  const startUploadFlow = useCallback(() => {
    setUploadFlowOpened(true)
  }, [])

  const startDownloadFlow = useCallback(() => {
    setDownloadFlowOpened(true)
  }, [])

  return (
    <>
      <LoadingState
        opened={loadingState}
        message={manageFilesMessages.loadStateText.id}
        progress={progress}
      />
      <ManageFilesContent
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
        onDownloadClick={openDirectoryDialog && startDownloadFlow}
        onAddFileClick={startUploadFlow}
        allFilesSelected={
          selectedIds.size === Object.keys(activeFileMap).length &&
          selectedIds.size > 0
        }
      >
        {children({ onSelectedChange: updateSelection, selectedIds })}
      </ManageFilesContent>
      <GenericDeleteFlow
        ref={genericDeleteRef}
        onDeleteSuccess={finalizeDeleteSuccess}
        deleteItemsAction={deleteFiles}
        deleteFlowMessages={messages}
      />
      <ManageFilesTransferFlow
        opened={uploadFlowOpened}
        onClose={() => setUploadFlowOpened(false)}
        openFileDialog={openFileDialog}
        onTransferSuccess={finalizeTransferSuccess}
        onPartialTransferFailure={handlePartialTransferFailure}
        transferFiles={transferFiles}
        transferFlowMessages={messages}
        fileMap={activeFileMap}
        freeSpaceBytes={freeSpaceBytes}
        supportedFileTypes={activeSupportedFileTypes}
      />
      {openDirectoryDialog && (
        <ManageFilesDownloadFlow
          opened={downloadFlowOpened}
          onClose={() => setDownloadFlowOpened(false)}
          openDirectoryDialog={openDirectoryDialog}
          onTransferSuccess={finalizeTransferSuccess}
          onPartialTransferFailure={handlePartialTransferFailure}
          transferFiles={transferFiles}
          transferFlowMessages={messages}
          fileMap={activeFileMap}
          freeSpaceBytes={freeSpaceBytes}
          selectedFiles={selectedFiles}
        />
      )}
    </>
  )
}
