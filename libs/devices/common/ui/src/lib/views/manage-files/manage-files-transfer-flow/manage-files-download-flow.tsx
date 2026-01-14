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
import { FileManagerFile } from "../manage-files.types"
import { manageFilesMessages } from "../manage-files.messages"
import {
  ManageFilesTransferProgressModal,
  ManageFilesTransferringModalProps,
} from "./manage-files-transfer-progress-modal"
import { ManageFilesTransferValidationFailedModalProps } from "./manage-files-transfer-validation-failed-modal"
import {
  ManageFilesTransferFailedModal,
  ManageFilesTransferFailedModalProps,
} from "./manage-files-transfer-failed-modal"
import { useBrowseForDirectory } from "./use-browse/use-browse-for-directory"
import { UseManageFilesTransferFlowArgs } from "./use-manage-files-transfer-flow/use-manage-files-transfer-flow"
import { useManageFilesDownloadFlow } from "./use-manage-files-transfer-flow/use-manage-files-download-flow"

enum ManageFilesDownloadFlowState {
  Idle = "Idle",
  BrowseDirectory = "BrowseDirectory",
  TransferringFiles = "TransferringFiles",
  TransferFailed = "TransferFailed",
}

type ManageFilesDeleteFlowMessages =
  ManageFilesTransferValidationFailedModalProps["messages"] &
    ManageFilesTransferFailedModalProps["messages"] & {
      uploadingModalTitle: ManageFilesTransferringModalProps["messages"]["transferringModalTitle"]
      uploadingModalCloseButtonText: ManageFilesTransferringModalProps["messages"]["transferringModalCloseButtonText"]
    }

export interface ManageFilesDownloadFlowProps {
  openDirectoryDialog: (
    options: OpenDialogOptionsLite
  ) => Promise<string | null>
  transferFiles: UseManageFilesTransferFlowArgs["transferFiles"]
  onTransferSuccess?: () => Promise<void>
  onPartialTransferFailure?: (failedFiles: FileManagerFile[]) => Promise<void>
  transferFlowMessages: ManageFilesDeleteFlowMessages
  freeSpaceBytes: number
  ref?: RefObject<{
    downloadItems: (items: FileManagerFile[]) => void
    close: VoidFunction
  } | null>
}

export const ManageFilesDownloadFlow = ({
  openDirectoryDialog,
  transferFiles,
  onTransferSuccess,
  onPartialTransferFailure,
  transferFlowMessages,
  ref,
}: ManageFilesDownloadFlowProps) => {
  const { addToast } = useToastContext()

  const [selectedItems, setSelectedItems] = useState<FileManagerFile[]>([])
  const [flowState, setFlowState] = useState<ManageFilesDownloadFlowState>(
    ManageFilesDownloadFlowState.Idle
  )
  const [failedTransfers, setFailedTransfers] = useState<FailedTransferItem[]>(
    []
  )

  const { transfer, progress, transferMode, abortTransfer, currentFile } =
    useManageFilesDownloadFlow({
      transferFiles,
    })

  const handleClose = useCallback(() => {
    setSelectedItems([])
    setFlowState(ManageFilesDownloadFlowState.Idle)
  }, [])

  const processSelectedDirectory = useCallback(
    async (directory: string) => {
      setFlowState(ManageFilesDownloadFlowState.TransferringFiles)

      const files = selectedItems.map((file) => ({
        ...file,
        id: `${directory}/${file.name}`,
      }))
      const { failed } = await transfer(files)

      if (failed.length > 0) {
        setFailedTransfers(failed)
        setFlowState(ManageFilesDownloadFlowState.TransferFailed)
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

      setFlowState(ManageFilesDownloadFlowState.Idle)
    },
    [addToast, onTransferSuccess, selectedItems, transfer]
  )

  useBrowseForDirectory({
    opened: flowState === ManageFilesDownloadFlowState.BrowseDirectory,
    openDirectoryDialog,
    onSelect: processSelectedDirectory,
    onCancel: handleClose,
  })

  const closeTransferFailedModal = useCallback(async () => {
    const failedFiles = failedTransfers
      .map((f) => {
        return selectedItems.find((file) => file.id === f.id)
      })
      .filter(Boolean) as FileManagerFile[]

    onPartialTransferFailure && (await onPartialTransferFailure(failedFiles))
    setFlowState(ManageFilesDownloadFlowState.Idle)
  }, [failedTransfers, onPartialTransferFailure, selectedItems])

  const cancelTransfer = useCallback(async () => {
    abortTransfer()
  }, [abortTransfer])

  useImperativeHandle(ref, () => ({
    downloadItems: (items: FileManagerFile[]) => {
      setSelectedItems(items)
      setFlowState(ManageFilesDownloadFlowState.BrowseDirectory)
    },
    close: handleClose,
  }))

  return (
    <>
      <ManageFilesTransferProgressModal
        opened={flowState === ManageFilesDownloadFlowState.TransferringFiles}
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
        opened={flowState === ManageFilesDownloadFlowState.TransferFailed}
        failedFiles={failedTransfers}
        allFiles={selectedItems}
        onClose={closeTransferFailedModal}
        messages={transferFlowMessages}
        actionType={TransferFilesActionType.Download}
      />
    </>
  )
}

// eslint-disable-next-line no-redeclare
export type ManageFilesDownloadFlow = NonNullable<
  ManageFilesDownloadFlowProps["ref"]
>["current"]
