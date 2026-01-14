/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { Messages } from "app-localize/utils"
import {
  FilePreviewFile,
  GenericDeleteFlow,
  GenericDeleteFlowProps,
  GenericDeleteItem,
  ScreenLoader,
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
import {
  FileManagerPreview,
  FileManagerPreviewProps,
} from "./files-preview/file-manager-preview"
import { ManageFilesForm, ManageFilesFormValues } from "./manage-files-form"
import styled from "styled-components"
import { useFormContext } from "react-hook-form"

type ManageFilesViewChild = (
  ctx: Pick<ManageFilesTableSectionProps, "onRowClick">
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
  extends
    ManageFilesStorageSummaryProps,
    ManageFilesCategoryListProps,
    ManageFilesOtherFilesProps,
    Pick<
      ManageFilesTransferFlowProps,
      "openFileDialog" | "transferFiles" | "onTransferSuccess"
    >,
    Partial<Pick<ManageFilesDownloadFlowProps, "openDirectoryDialog">>,
    Partial<Pick<FileManagerPreviewProps, "downloadFilePreview" | "deviceId">> {
  activeFileMap: FileManagerFileMap
  onActiveCategoryChange: (categoryId: string) => void
  isLoading: boolean
  children: ManageFilesViewChild
  messages: ManageFilesViewMessages
  deleteFiles: GenericDeleteFlowProps["deleteItemsAction"]
  onDeleteSuccess?: (params: {
    deletedIds?: string[]
    failedIds?: string[]
  }) => void
  progress?: number
}

export const ManageFiles: FunctionComponent<ManageFilesViewProps> = (props) => {
  return (
    <ManageFilesForm>
      <ManageFilesInner {...props} />
    </ManageFilesForm>
  )
}

export const ManageFilesInner: FunctionComponent<ManageFilesViewProps> = (
  props
) => {
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
    downloadFilePreview,
    isLoading,
    categories,
    segments,
    freeSpaceBytes,
    usedSpaceBytes,
    otherSpaceBytes,
    otherFiles,
    children,
    progress,
    deviceId,
  } = props
  const { getValues, setValue } = useFormContext<ManageFilesFormValues>()
  const genericDeleteRef = useRef<GenericDeleteFlow>(null)
  const filePreviewRef = useRef<FileManagerPreview>(null)
  const filesDownloadRef = useRef<ManageFilesDownloadFlow>(null)
  const filesTransferRef = useRef<ManageFilesTransferFlow>(null)

  const activeSupportedFileTypes = useMemo(() => {
    return (
      categories.find(({ id }) => id === activeCategoryId)
        ?.supportedFileTypes || []
    )
  }, [activeCategoryId, categories])

  const unselectAllFiles = useCallback(() => {
    setValue("selectedFiles", {})
    setValue(
      "selectedFiles",
      Object.fromEntries(Object.keys(activeFileMap).map((id) => [id, false]))
    )
  }, [activeFileMap, setValue])

  const previewFiles: FilePreviewFile[] = useMemo(() => {
    return Object.values(activeFileMap).map((file) => {
      return {
        id: file.id,
        name: file.name,
        type: file.mimeType,
        extension: file.type,
        size: file.size,
        path: file.path,
      }
    })
  }, [activeFileMap])

  const startDeleteFlow = useCallback(
    (fileId?: string) => {
      const deleteItems: GenericDeleteItem[] = []

      if (fileId) {
        const file = activeFileMap[fileId]
        if (file) {
          deleteItems.push({ id: file.id, name: file.name })
        }
      } else {
        const selectedFiles = getValues("selectedFiles")
        Object.entries(selectedFiles)
          .filter(([, checked]) => checked)
          .forEach(([id]) => {
            const file = activeFileMap[id]
            if (file) {
              deleteItems.push({ id: file.id, name: file.name })
            }
          })
      }

      if (deleteItems.length === 0) {
        return
      }

      genericDeleteRef.current?.deleteItems(deleteItems)
    },
    [activeFileMap, getValues]
  )

  const deleteItemsAction = useCallback(
    async (itemsIds: string[]) => {
      const response = await deleteFiles(itemsIds)

      // If the currently previewed file was deleted, move to the next one or close the preview
      const currentPreviewFileId = filePreviewRef.current?.getCurrentId()
      if (currentPreviewFileId !== undefined) {
        if (
          itemsIds.includes(currentPreviewFileId) &&
          !response.failedIds.includes(currentPreviewFileId)
        ) {
          if (previewFiles.length > 1) {
            filePreviewRef.current?.next()
          } else {
            filePreviewRef.current?.close()
          }
        }
      }

      return response
    },
    [deleteFiles, previewFiles.length]
  )

  const changeCategory = useCallback(
    (categoryId: string) => {
      if (categoryId === activeCategoryId) {
        return
      }
      onActiveCategoryChange(categoryId)
    },
    [activeCategoryId, onActiveCategoryChange]
  )

  const loadingState = isLoading || activeCategoryId === undefined

  const finalizeDeleteSuccess: NonNullable<
    GenericDeleteFlowProps["onDeleteSuccess"]
  > = useCallback(
    async ({ failedItems, allItems }) => {
      void onDeleteSuccess?.({
        failedIds: failedItems?.map((item) => item.id),
        deletedIds: allItems
          .map((item) => item.id)
          .filter(
            (id) => !failedItems?.some((failedItem) => failedItem.id === id)
          ),
      })

      if (failedItems && failedItems.length > 0) {
        setValue(
          "selectedFiles",
          Object.fromEntries(failedItems.map((item) => [item.id, true]))
        )
      } else {
        unselectAllFiles()
      }
    },
    [onDeleteSuccess, setValue, unselectAllFiles]
  )

  const finalizeTransferSuccess = useCallback(async () => {
    onTransferSuccess && (await onTransferSuccess())
    filesTransferRef.current?.close()
    filesDownloadRef.current?.close()
  }, [onTransferSuccess])

  const handlePartialTransferFailure = useCallback(async () => {
    filesTransferRef.current?.close()
    onTransferSuccess && (await onTransferSuccess())
  }, [onTransferSuccess])

  const startUploadFlow = useCallback(() => {
    filesTransferRef.current?.transferItems()
  }, [])

  const startDownloadFlow = useCallback(
    (fileId?: string) => {
      if (fileId !== undefined) {
        filesDownloadRef.current?.downloadItems([activeFileMap[fileId]])
      } else {
        const selectedFiles = getValues("selectedFiles")
        const filesToDownload = Object.entries(selectedFiles)
          .filter(([, checked]) => checked)
          .map(([id]) => activeFileMap[id])
        if (filesToDownload.length === 0) {
          return
        }
        filesDownloadRef.current?.downloadItems(filesToDownload)
      }
    },
    [activeFileMap, getValues]
  )

  const onRowClick = useCallback((fileId?: string) => {
    if (!fileId) {
      return
    }
    filePreviewRef.current?.open(fileId)
  }, [])

  const content = useMemo(() => {
    /* eslint-disable-next-line react-hooks/refs */
    return children({
      onRowClick: downloadFilePreview ? onRowClick : undefined,
    })
  }, [children, downloadFilePreview, onRowClick])

  useEffect(() => {
    unselectAllFiles()
  }, [unselectAllFiles])

  return (
    <ScreenLoader
      loading={loadingState}
      message={manageFilesMessages.loadStateText.id}
      progress={progress}
    >
      <Content>
        <ManageFilesContent
          segments={segments}
          categories={categories}
          activeCategoryId={activeCategoryId}
          messages={messages}
          freeSpaceBytes={freeSpaceBytes}
          usedSpaceBytes={usedSpaceBytes}
          otherSpaceBytes={otherSpaceBytes}
          otherFiles={otherFiles}
          onCategoryClick={changeCategory}
          onDeleteClick={startDeleteFlow}
          onDownloadClick={openDirectoryDialog && startDownloadFlow}
          onAddFileClick={startUploadFlow}
          filesIds={Object.keys(activeFileMap)}
        >
          {content}
        </ManageFilesContent>
        {deviceId && downloadFilePreview && (
          <FileManagerPreview
            ref={filePreviewRef}
            files={previewFiles}
            deviceId={deviceId}
            downloadFilePreview={downloadFilePreview}
            onDelete={startDeleteFlow}
            onDownload={startDownloadFlow}
          />
        )}
        <GenericDeleteFlow
          ref={genericDeleteRef}
          onDeleteSuccess={finalizeDeleteSuccess}
          deleteItemsAction={deleteItemsAction}
          deleteFlowMessages={messages}
        />
        <ManageFilesTransferFlow
          ref={filesTransferRef}
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
            ref={filesDownloadRef}
            openDirectoryDialog={openDirectoryDialog}
            onTransferSuccess={finalizeTransferSuccess}
            onPartialTransferFailure={handlePartialTransferFailure}
            transferFiles={transferFiles}
            transferFlowMessages={messages}
            freeSpaceBytes={freeSpaceBytes}
          />
        )}
      </Content>
    </ScreenLoader>
  )
}

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`
