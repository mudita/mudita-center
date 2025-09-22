/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useMemo, useState } from "react"
import { OpenDialogOptionsLite } from "app-utils/models"
import { ManageFilesTransferringModal } from "./manage-files-transferring-modal"
import { ManageFilesDeleteFailedModalProps } from "./manage-files-delete-failed-modal"
import {
  FileManagerFile,
  FileManagerFileMap,
  FileTransferResult,
  FileTransferValidationResult,
} from "./manage-files.types"
import { validateSelectedFiles } from "./validate-selected-files"
import {
  ManageFilesTransferValidationFailedModal,
  ManageFilesTransferValidationFailedModalProps,
} from "./manage-files-transfer-validation-failed-modal"
import {
  ManageFilesTransferFailedModal,
  ManageFilesTransferFailedModalProps,
} from "./manage-files-transfer-failed-modal"
import { FileTransferFailed } from "./manage-files-transfer-failed.copy"
import { manageFilesMessages } from "./manage-files.messages"
import { useBrowseForFiles } from "./use-browse-for-files"

enum ManageFilesTransferFlowState {
  Idle = "Idle",

  BrowseFiles = "BrowseFiles",
  ValidationFailed = "ValidationFailed",
  TransferringFiles = "TransferringFiles",
  TransferFailed = "TransferFailed",
}

type ManageFilesDeleteFlowMessages =
  ManageFilesDeleteFailedModalProps["messages"] &
    ManageFilesTransferValidationFailedModalProps["messages"] &
    ManageFilesTransferFailedModalProps["messages"]

export interface ManageFilesTransferFlowProps {
  opened: boolean
  onClose: VoidFunction
  fileMap: FileManagerFileMap
  openFileDialog: (options: OpenDialogOptionsLite) => Promise<FileManagerFile[]>
  handleTransfer: (filePath: FileManagerFile) => Promise<FileTransferResult>
  onTransferSuccess?: () => Promise<void>
  onPartialTransferFailure?: (failedFiles: FileManagerFile[]) => Promise<void>
  transferFlowMessages: ManageFilesDeleteFlowMessages
  freeSpaceBytes: number
  supportedFileTypes: string[]
}

export const ManageFilesTransferFlow = ({
  opened,
  onClose,
  fileMap,
  freeSpaceBytes,
  openFileDialog,
  handleTransfer,
  onTransferSuccess,
  onPartialTransferFailure,
  transferFlowMessages,
  supportedFileTypes,
}: ManageFilesTransferFlowProps) => {
  const [flowState, setFlowState] = useState<ManageFilesTransferFlowState>(
    ManageFilesTransferFlowState.Idle
  )
  const [selectedFiles, setSelectedFiles] = useState<FileManagerFile[]>([])
  const [validationResult, setValidationResult] =
    useState<FileTransferValidationResult>()
  const [failedTransfers, setFailedTransfers] = useState<FileTransferFailed[]>(
    []
  )

  useEffect(() => {
    setFlowState(
      opened
        ? ManageFilesTransferFlowState.BrowseFiles
        : ManageFilesTransferFlowState.Idle
    )
  }, [opened])
  const existingFiles = useMemo(() => Object.values(fileMap), [fileMap])

  const startTransferFlowForFiles = useCallback(
    async (files: FileManagerFile[]) => {
      setSelectedFiles(files)

      if (files.length === 0) {
        setFlowState(ManageFilesTransferFlowState.Idle)
        onClose()
        return
      }

      const validation = validateSelectedFiles(
        files,
        existingFiles,
        freeSpaceBytes
      )

      if (!validation.ok) {
        setValidationResult(validation)
        setFlowState(ManageFilesTransferFlowState.ValidationFailed)
        return
      }

      const failed: FileTransferFailed[] = []
      setFlowState(ManageFilesTransferFlowState.TransferringFiles)

      for (const file of files) {
        const transferResult = await handleTransfer(file)
        if (!transferResult.ok) {
          failed.push({
            ...file,
            errorName: transferResult.error.name,
            values: transferResult.data,
          })
        }
      }

      if (failed.length > 0) {
        setFailedTransfers(failed)
        setFlowState(ManageFilesTransferFlowState.TransferFailed)
        return
      }

      if (onTransferSuccess) {
        await onTransferSuccess()
      }

      setFlowState(ManageFilesTransferFlowState.Idle)
    },
    [existingFiles, freeSpaceBytes, handleTransfer, onClose, onTransferSuccess]
  )

  useBrowseForFiles({
    opened: flowState === ManageFilesTransferFlowState.BrowseFiles,
    supportedFileTypes,
    openFileDialog,
    onSelect: startTransferFlowForFiles,
    onCancel: onClose,
  })

  const handleValidationFailedClose = useCallback(async () => {
    setFlowState(ManageFilesTransferFlowState.Idle)
    onClose()
  }, [onClose])

  const handleTransferFaileClose = useCallback(async () => {
    onPartialTransferFailure &&
      (await onPartialTransferFailure(failedTransfers))
    setFlowState(ManageFilesTransferFlowState.Idle)
  }, [failedTransfers, onPartialTransferFailure])

  if (!opened) {
    return null
  }

  return (
    <>
      <ManageFilesTransferValidationFailedModal
        opened={flowState === ManageFilesTransferFlowState.ValidationFailed}
        result={validationResult}
        onClose={handleValidationFailedClose}
        messages={transferFlowMessages}
        selectedFiles={selectedFiles}
      />
      <ManageFilesTransferringModal
        opened={flowState === ManageFilesTransferFlowState.TransferringFiles}
        fileCount={selectedFiles.length}
        messages={{ transferringModalTitle: manageFilesMessages.loadStateText }}
      />
      <ManageFilesTransferFailedModal
        opened={flowState === ManageFilesTransferFlowState.TransferFailed}
        failedFiles={failedTransfers}
        allFiles={selectedFiles}
        onClose={handleTransferFaileClose}
        messages={transferFlowMessages}
      />
    </>
  )
}
