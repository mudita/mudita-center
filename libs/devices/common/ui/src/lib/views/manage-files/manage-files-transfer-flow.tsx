/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useState } from "react"
import { OpenDialogOptionsLite } from "app-utils/models"
import { useToastContext } from "app-theme/ui"
import { formatMessage, Messages } from "app-localize/utils"
import {
  ManageFilesTransferringModal,
  ManageFilesTransferringModalProps,
} from "./manage-files-transferring-modal"
import { ManageFilesDeleteFailedModalProps } from "./manage-files-delete-failed-modal"
import {
  FileManagerFile,
  FileManagerFileMap,
  ValidationSummary,
  ValidationSummaryType,
} from "./manage-files.types"
import {
  ManageFilesTransferValidationFailedModal,
  ManageFilesTransferValidationFailedModalProps,
} from "./manage-files-transfer-validation-failed-modal"
import {
  ManageFilesTransferFailedModal,
  ManageFilesTransferFailedModalProps,
} from "./manage-files-transfer-failed-modal"
import { useBrowseForFiles } from "./use-browse-for-files"
import {
  useManageFilesTransferFlow,
  UseManageFilesTransferFlowArgs,
} from "./use-manage-files-transfer-flow"
import { useManageFilesValidate } from "./use-manage-files-validate"
import { FileTransferFailed } from "./manage-files-transfer-failed.copy"
import { createManageFilesToastContent } from "./create-manage-files-toast-content"
import { manageFilesMessages } from "./manage-files.messages"

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
    ManageFilesTransferFailedModalProps["messages"] & {
      uploadingModalTitle: ManageFilesTransferringModalProps["messages"]["transferringModalTitle"]
      uploadingModalCloseButtonText: ManageFilesTransferringModalProps["messages"]["transferringModalCloseButtonText"]
    }

export interface ManageFilesTransferFlowProps {
  opened: boolean
  onClose: VoidFunction
  fileMap: FileManagerFileMap
  openFileDialog: (options: OpenDialogOptionsLite) => Promise<FileManagerFile[]>
  handleTransfer: UseManageFilesTransferFlowArgs["handleTransfer"]
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
  const { addToast } = useToastContext()
  const [flowState, setFlowState] = useState<ManageFilesTransferFlowState>(
    ManageFilesTransferFlowState.Idle
  )
  const [selectedFiles, setSelectedFiles] = useState<FileManagerFile[]>([])
  const [validationResult, setValidationResult] = useState<ValidationSummary>()
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

  const validate = useManageFilesValidate({ fileMap, freeSpaceBytes })

  const {
    action: transfer,
    progress,
    abort,
    transferringFile,
  } = useManageFilesTransferFlow({
    handleTransfer: handleTransfer,
  })

  const handleSetSelectedFiles = useCallback(
    async (files: FileManagerFile[]) => {
      setSelectedFiles(files)

      if (files.length === 0) {
        setFlowState(ManageFilesTransferFlowState.Idle)
        onClose()
        return
      }

      const validationSummary = validate(files)

      const isTransferAllowed =
        validationSummary.type === ValidationSummaryType.AllFilesValid ||
        validationSummary.type === ValidationSummaryType.SomeFilesInvalid

      if (!isTransferAllowed) {
        setValidationResult(validationSummary)
        setFlowState(ManageFilesTransferFlowState.ValidationFailed)
        return
      }

      setFlowState(ManageFilesTransferFlowState.TransferringFiles)

      const { failed } = await transfer(validationSummary.files)

      if (failed.length > 0) {
        setFailedTransfers(failed)
        setFlowState(ManageFilesTransferFlowState.TransferFailed)
        return
      }

      if (onTransferSuccess) {
        await onTransferSuccess()
      }

      addToast(
        createManageFilesToastContent({
          text: formatMessage(manageFilesMessages.uploadSuccessToastText, {
            fileCount: files.length,
          }),
        })
      )

      setFlowState(ManageFilesTransferFlowState.Idle)
    },
    [addToast, onClose, onTransferSuccess, transfer, validate]
  )

  useBrowseForFiles({
    opened: flowState === ManageFilesTransferFlowState.BrowseFiles,
    supportedFileTypes,
    openFileDialog,
    onSelect: handleSetSelectedFiles,
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

  const handleFilesTransferringClose = useCallback(async () => {
    abort()
  }, [abort])

  if (!opened) {
    return null
  }

  return (
    <>
      <ManageFilesTransferValidationFailedModal
        opened={flowState === ManageFilesTransferFlowState.ValidationFailed}
        validationSummary={validationResult}
        onClose={handleValidationFailedClose}
        messages={transferFlowMessages}
        selectedFiles={selectedFiles}
      />
      <ManageFilesTransferringModal
        opened={flowState === ManageFilesTransferFlowState.TransferringFiles}
        filesCount={selectedFiles.length}
        messages={{
          transferringModalTitle: transferFlowMessages.uploadingModalTitle,
          transferringModalCloseButtonText:
            transferFlowMessages.uploadingModalCloseButtonText,
        }}
        progressBarMessage={transferringFile?.name ?? ""}
        progress={progress}
        onCancel={handleFilesTransferringClose}
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
