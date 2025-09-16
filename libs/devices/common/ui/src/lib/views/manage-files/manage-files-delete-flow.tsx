/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ComponentProps,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react"
import { delayUntil } from "app-utils/common"
import { ManageFilesDeletingModal } from "./manage-files-deleting-modal"
import { ManageFilesConfirmDeleteModal } from "./manage-files-confirm-delete-modal"
import { FileManagerFile } from "./manage-files.types"

enum FlowState {
  ConfirmDelete,
  Deleting,
}

interface Props {
  opened: boolean
  selectedFiles: FileManagerFile[]
  onClose: VoidFunction
  onDeleteFile: (fileId: string) => Promise<void>
  onSuccessfulDelete?: () => Promise<void>
  confirmDeleteModalMessages: ComponentProps<
    typeof ManageFilesConfirmDeleteModal
  >["messages"]
}

export const ManageFilesDeleteFlow: FunctionComponent<Props> = ({
  opened,
  onClose,
  selectedFiles,
  onDeleteFile,
  onSuccessfulDelete,
  confirmDeleteModalMessages,
}) => {
  const [flowState, setFlowState] = useState<FlowState | null>(
    opened ? FlowState.ConfirmDelete : null
  )

  useEffect(() => {
    setFlowState(opened ? FlowState.ConfirmDelete : null)
  }, [opened])

  const handleConfirmDeleteClick = useCallback(async () => {
    setFlowState(FlowState.Deleting)

    const handle = async () => {
      for (const file of selectedFiles) {
        if (file) {
          await onDeleteFile(file.id)
        }
      }

      onSuccessfulDelete && (await onSuccessfulDelete())
      setFlowState(null)
    }

    await delayUntil(handle(), 500)
  }, [onSuccessfulDelete, selectedFiles, onDeleteFile])

  return (
    <>
      <ManageFilesConfirmDeleteModal
        opened={flowState === FlowState.ConfirmDelete}
        onClose={onClose}
        onPrimaryButtonClick={handleConfirmDeleteClick}
        onSecondaryButtonClick={onClose}
        selectedItems={selectedFiles.length}
        messages={confirmDeleteModalMessages}
      />
      <ManageFilesDeletingModal opened={flowState === FlowState.Deleting} />
    </>
  )
}
