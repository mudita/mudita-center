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
  ManageFilesTableSectionProps,
} from "./manage-files.types"
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
import { useFormContext } from "react-hook-form"

type ManageFilesViewChild = (
  ctx: Pick<ManageFilesTableSectionProps, "onRowClick"> & {
    categoryId: string
    files?: FileManagerFile[]
  }
) => ReactNode

type ManageFilesViewMessages =
  ManageFilesTransferFlowProps["transferFlowMessages"] &
    ManageFilesStorageSummaryProps["messages"] &
    ManageFilesFileListEmptyProps["messages"] &
    FileListPanelHeaderProps["messages"] &
    ManageFilesDownloadFlowProps["transferFlowMessages"] &
    GenericDeleteFlowProps["deleteFlowMessages"] & {
      summaryHeader: Messages
    }

export interface ManageFilesViewProps
  extends
    Omit<ManageFilesCategoryListProps, "categories">,
    Pick<
      ManageFilesTransferFlowProps,
      "openFileDialog" | "transferFiles" | "onTransferSuccess"
    >,
    Partial<Pick<ManageFilesDownloadFlowProps, "openDirectoryDialog">>,
    Partial<Pick<FileManagerPreviewProps, "downloadFilePreview" | "deviceId">> {
  files?: FileManagerFile[]
  onActiveCategoryChange: (categoryId: string) => void
  children: ManageFilesViewChild
  messages: ManageFilesViewMessages
  deleteFiles: GenericDeleteFlowProps["deleteItemsAction"]
  storageInfo?: Omit<ManageFilesStorageSummaryProps, "messages"> &
    Pick<ManageFilesCategoryListProps, "categories"> &
    ManageFilesOtherFilesProps
}

export const ManageFiles: FunctionComponent<ManageFilesViewProps> = (props) => {
  return (
    <ManageFilesForm>
      <ManageFilesInner {...props} />
    </ManageFilesForm>
  )
}

export const ManageFilesInner: FunctionComponent<ManageFilesViewProps> = ({
  files = [],
  messages,
  activeCategoryId,
  onActiveCategoryChange,
  deleteFiles,
  transferFiles,
  onTransferSuccess,
  openFileDialog,
  openDirectoryDialog,
  downloadFilePreview,
  storageInfo,
  children,
  deviceId,
}) => {
  const { getValues, setValue } = useFormContext<ManageFilesFormValues>()
  const genericDeleteRef = useRef<GenericDeleteFlow>(null)
  const filePreviewRef = useRef<FileManagerPreview>(null)
  const filesDownloadRef = useRef<ManageFilesDownloadFlow>(null)
  const filesTransferRef = useRef<ManageFilesTransferFlow>(null)

  const filesIds = useMemo(() => files.map((file) => file.id), [files])

  const activeSupportedFileTypes = useMemo(() => {
    return (
      storageInfo?.categories.find(({ id }) => id === activeCategoryId)
        ?.supportedFileTypes || []
    )
  }, [activeCategoryId, storageInfo?.categories])

  const unselectAllFiles = useCallback(() => {
    setValue("selectedFiles", {})
    setValue(
      "selectedFiles",
      Object.fromEntries(files.map((id) => [id, false]))
    )
  }, [files, setValue])

  const previewFiles: FilePreviewFile[] = useMemo(() => {
    if (!downloadFilePreview) {
      return []
    }
    return files.map((file) => {
      return {
        id: file.id,
        name: file.name,
        type: file.mimeType,
        extension: file.type,
        size: file.size,
        path: file.path,
      }
    })
  }, [downloadFilePreview, files])

  const startDeleteFlow = useCallback(
    (fileId?: string) => {
      const deleteItems: GenericDeleteItem[] = []

      if (fileId) {
        const file = files.find((f) => f.id === fileId)
        if (file) {
          deleteItems.push({ id: file.id, name: file.name })
        }
      } else {
        const selectedFiles = getValues("selectedFiles")
        Object.entries(selectedFiles)
          .filter(([, checked]) => checked)
          .forEach(([id]) => {
            const file = files.find((f) => f.id === id)
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
    [files, getValues]
  )

  const deleteItemsAction = useCallback(
    async (itemsIds: string[]) => {
      const response = await deleteFiles(itemsIds)

      // If the currently previewed file was deleted, move to the next one or close the preview
      const currentPreviewFileId = filePreviewRef.current?.getCurrentId()
      if (currentPreviewFileId !== undefined) {
        if (
          itemsIds.includes(currentPreviewFileId) &&
          !response.failedIds?.includes(currentPreviewFileId)
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

  const finalizeDeleteSuccess: NonNullable<
    GenericDeleteFlowProps["onDeleteSuccess"]
  > = useCallback(
    async ({ failedItems, allItems }) => {
      if (failedItems && failedItems.length > 0) {
        setValue(
          "selectedFiles",
          Object.fromEntries(
            allItems.map((item) => [
              item.id,
              !!failedItems.find((failed) => failed.id === item.id),
            ])
          )
        )
      } else {
        unselectAllFiles()
      }
    },
    [setValue, unselectAllFiles]
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
        filesDownloadRef.current?.downloadItems(
          files.filter((f) => f.id === fileId)
        )
      } else {
        const selectedFiles = getValues("selectedFiles")
        const filesToDownload = Object.entries(selectedFiles)
          .filter(([, checked]) => checked)
          .map(([id]) => files.find((f) => f.id === id))
          .filter((f): f is FileManagerFile => f !== undefined)
        if (filesToDownload.length === 0) {
          return
        }
        filesDownloadRef.current?.downloadItems(filesToDownload)
      }
    },
    [files, getValues]
  )

  const onRowClick = useCallback((fileId?: string) => {
    if (!fileId) {
      return
    }
    filePreviewRef.current?.open(fileId)
  }, [])

  const content = useMemo(() => {
    return children({
      onRowClick: downloadFilePreview ? onRowClick : undefined,
      categoryId: activeCategoryId,
      files,
    })
  }, [activeCategoryId, children, downloadFilePreview, files, onRowClick])

  useEffect(() => {
    unselectAllFiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, storageInfo])

  if (!storageInfo) {
    return null
  }

  return (
    <>
      <ManageFilesContent
        segments={storageInfo.segments}
        categories={storageInfo.categories}
        activeCategoryId={activeCategoryId}
        messages={messages}
        freeSpaceBytes={storageInfo.freeSpaceBytes}
        usedSpaceBytes={storageInfo.usedSpaceBytes}
        otherSpaceBytes={storageInfo.otherSpaceBytes}
        otherFiles={storageInfo.otherFiles}
        onCategoryClick={changeCategory}
        onDeleteClick={startDeleteFlow}
        onDownloadClick={openDirectoryDialog && startDownloadFlow}
        onAddFileClick={startUploadFlow}
        filesIds={filesIds}
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
        files={files}
        freeSpaceBytes={storageInfo.freeSpaceBytes}
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
          freeSpaceBytes={storageInfo.freeSpaceBytes}
        />
      )}
    </>
  )
}
