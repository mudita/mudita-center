/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useState } from "react"
import { OpenDialogOptionsLite } from "app-utils/models"
import { createToastContent, useToastContext } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import {
  FailedTransferItem,
  TransferFilesActionType,
  TransferMode,
} from "devices/common/models"
import {
  FileManagerFile,
  FileManagerFileMap,
  ValidationSummary,
  ValidationSummaryType,
} from "../manage-files.types"
import { manageFilesMessages } from "../manage-files.messages"
import {
  useManageFilesTransferFlow,
  UseManageFilesTransferFlowArgs,
} from "./use-manage-files-transfer-flow/use-manage-files-transfer-flow"
import {
  ManageFilesTransferProgressModal,
  ManageFilesTransferringModalProps,
} from "./manage-files-transfer-progress-modal"
import {
  ManageFilesTransferValidationFailedModal,
  ManageFilesTransferValidationFailedModalProps,
} from "./manage-files-transfer-validation-failed-modal"
import {
  ManageFilesTransferFailedModal,
  ManageFilesTransferFailedModalProps,
} from "./manage-files-transfer-failed-modal"
import { useBrowseForFiles } from "./use-browse-for-files"
import { useManageFilesValidate } from "./use-manage-files-validate"

enum ManageFilesTransferFlowState {
  Idle = "Idle",
  BrowseFiles = "BrowseFiles",
  ValidationFailed = "ValidationFailed",
  TransferringFiles = "TransferringFiles",
  TransferFailed = "TransferFailed",
}

type ManageFilesDeleteFlowMessages =
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
  transferFiles: UseManageFilesTransferFlowArgs["transferFiles"]
  onTransferSuccess?: () => Promise<void>
  onPartialTransferFailure?: (failedFiles: FileManagerFile[]) => Promise<void>
  transferFlowMessages: ManageFilesDeleteFlowMessages
  freeSpaceBytes: number
  supportedFileTypes: string[]
  actionType: TransferFilesActionType
}

export const ManageFilesTransferFlow = ({
  opened,
  onClose,
  fileMap,
  freeSpaceBytes,
  openFileDialog,
  transferFiles,
  onTransferSuccess,
  onPartialTransferFailure,
  transferFlowMessages,
  supportedFileTypes,
  actionType,
}: ManageFilesTransferFlowProps) => {
  const { addToast } = useToastContext()
  const [flowState, setFlowState] = useState<ManageFilesTransferFlowState>(
    ManageFilesTransferFlowState.Idle
  )
  const [selectedFiles, setSelectedFiles] = useState<FileManagerFile[]>([])
  const [validationResult, setValidationResult] = useState<ValidationSummary>()
  const [failedTransfers, setFailedTransfers] = useState<FailedTransferItem[]>(
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

  const { transfer, progress, transferMode, abortTransfer, currentFile } =
    useManageFilesTransferFlow({
      transferFiles,
      actionType,
    })

  const processSelectedFiles = useCallback(
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
        createToastContent({
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
    onSelect: processSelectedFiles,
    onCancel: onClose,
  })

  const closeValidationFailedModal = useCallback(async () => {
    setFlowState(ManageFilesTransferFlowState.Idle)
    onClose()
  }, [onClose])

  const closeTransferFailedModal = useCallback(async () => {
    const failedFiles = failedTransfers.map((f) => fileMap[f.id])
    onPartialTransferFailure && (await onPartialTransferFailure(failedFiles))
    setFlowState(ManageFilesTransferFlowState.Idle)
  }, [failedTransfers, fileMap, onPartialTransferFailure])

  const cancelTransfer = useCallback(async () => {
    abortTransfer()
  }, [abortTransfer])

  if (!opened) {
    return null
  }

  return (
    <>
      <ManageFilesTransferValidationFailedModal
        opened={flowState === ManageFilesTransferFlowState.ValidationFailed}
        validationSummary={validationResult}
        onClose={closeValidationFailedModal}
        messages={transferFlowMessages}
        selectedFiles={selectedFiles}
      />
      <ManageFilesTransferProgressModal
        opened={flowState === ManageFilesTransferFlowState.TransferringFiles}
        filesCount={selectedFiles.length}
        messages={{
          transferringModalTitle: transferFlowMessages.uploadingModalTitle,
          transferringModalCloseButtonText:
            transferFlowMessages.uploadingModalCloseButtonText,
        }}
        progressWarningVisible={transferMode === TransferMode.Serial}
        progressBarMessage={currentFile?.name ?? ""}
        progress={progress}
        onCancel={cancelTransfer}
      />
      <ManageFilesTransferFailedModal
        opened={flowState === ManageFilesTransferFlowState.TransferFailed}
        failedFiles={failedTransfers}
        allFiles={selectedFiles}
        onClose={closeTransferFailedModal}
        messages={transferFlowMessages}
        actionType={actionType}
      />
    </>
  )
}
