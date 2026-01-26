/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RefObject, useCallback, useImperativeHandle, useState } from "react"
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
import { useBrowseForFiles } from "./use-browse/use-browse-for-files"
import { useManageFilesValidate } from "./use-manage-files-validate"
import { theme } from "app-theme/utils"

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
  files: FileManagerFile[]
  openFileDialog: (options: OpenDialogOptionsLite) => Promise<FileManagerFile[]>
  transferFiles: UseManageFilesTransferFlowArgs["transferFiles"]
  onTransferSuccess?: () => Promise<void>
  onPartialTransferFailure?: (failedFiles: FileManagerFile[]) => Promise<void>
  transferFlowMessages: ManageFilesDeleteFlowMessages
  freeSpaceBytes: number
  supportedFileTypes: string[]
  ref?: RefObject<{
    transferItems: VoidFunction
    close: VoidFunction
  } | null>
}

export const ManageFilesTransferFlow = ({
  files,
  freeSpaceBytes,
  openFileDialog,
  transferFiles,
  onTransferSuccess,
  onPartialTransferFailure,
  transferFlowMessages,
  supportedFileTypes,
  ref,
}: ManageFilesTransferFlowProps) => {
  const { addToast } = useToastContext()
  const [selectedItems, setSelectedItems] = useState<FileManagerFile[]>([])
  const [flowState, setFlowState] = useState<ManageFilesTransferFlowState>(
    ManageFilesTransferFlowState.Idle
  )
  const [validationResult, setValidationResult] = useState<ValidationSummary>()
  const [failedTransfers, setFailedTransfers] = useState<FailedTransferItem[]>(
    []
  )

  const handleClose = useCallback(() => {
    setFlowState(ManageFilesTransferFlowState.Idle)

    setTimeout(() => {
      setSelectedItems([])
      setFailedTransfers([])
    }, theme.app.constants.modalTransitionDuration)
  }, [])

  const validate = useManageFilesValidate({
    existingFiles: files,
    freeSpaceBytes,
  })

  const { transfer, progress, transferMode, abortTransfer, currentFile } =
    useManageFilesTransferFlow({
      transferFiles,
      actionType: TransferFilesActionType.Upload,
    })

  const processSelectedFiles = useCallback(
    async (files: FileManagerFile[]) => {
      setSelectedItems(files)

      if (files.length === 0) {
        setFlowState(ManageFilesTransferFlowState.Idle)
        handleClose()
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
    [addToast, handleClose, onTransferSuccess, transfer, validate]
  )

  useBrowseForFiles({
    opened: flowState === ManageFilesTransferFlowState.BrowseFiles,
    supportedFileTypes,
    openFileDialog,
    onSelect: processSelectedFiles,
    onCancel: handleClose,
  })

  const closeValidationFailedModal = useCallback(async () => {
    setFlowState(ManageFilesTransferFlowState.Idle)
    handleClose()
  }, [handleClose])

  const closeTransferFailedModal = useCallback(async () => {
    const failedFiles = failedTransfers
      .map((f) => {
        return selectedItems.find((file) => file.id === f.id)
      })
      .filter(Boolean) as FileManagerFile[]

    onPartialTransferFailure && (await onPartialTransferFailure(failedFiles))
    setFlowState(ManageFilesTransferFlowState.Idle)
  }, [failedTransfers, onPartialTransferFailure, selectedItems])

  const cancelTransfer = useCallback(async () => {
    abortTransfer()
  }, [abortTransfer])

  useImperativeHandle(ref, () => ({
    transferItems: () => {
      setFlowState(ManageFilesTransferFlowState.BrowseFiles)
    },
    close: handleClose,
  }))

  return (
    <>
      <ManageFilesTransferValidationFailedModal
        opened={flowState === ManageFilesTransferFlowState.ValidationFailed}
        validationSummary={validationResult}
        onClose={closeValidationFailedModal}
        messages={transferFlowMessages}
        selectedFiles={selectedItems}
      />
      <ManageFilesTransferProgressModal
        opened={flowState === ManageFilesTransferFlowState.TransferringFiles}
        filesCount={selectedItems.length}
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
        allFiles={selectedItems}
        onClose={closeTransferFailedModal}
        messages={transferFlowMessages}
        actionType={TransferFilesActionType.Upload}
      />
    </>
  )
}

// eslint-disable-next-line no-redeclare
export type ManageFilesTransferFlow = NonNullable<
  ManageFilesTransferFlowProps["ref"]
>["current"]
