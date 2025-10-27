/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { delayUntil } from "app-utils/common"
import { formatMessage, Messages } from "app-localize/utils"
import { GenericProgressModal } from "../../generic-modals/generic-progress-modal"
import {
  GenericConfirmModal,
  GenericConfirmModalProps,
} from "../../generic-modals/generic-confirm-modal"
import {
  GenericDeleteFailedModal,
  GenericDeleteFailedModalProps,
} from "./generic-delete-failed-modal"
import {
  GenericDeleteFlowState,
  GenericDeleteItem,
} from "./generic-delete-flow.types"
import { useDeleteItems, UseDeleteItemsProps } from "./use-delete-items"

type GenericDeleteFlowMessages = GenericConfirmModalProps["messages"] &
  GenericDeleteFailedModalProps["messages"] &
  UseDeleteItemsProps["messages"] & {
    deletingModalTitle: Messages
  }

export interface GenericDeleteFlowProps {
  opened: boolean
  onClose: VoidFunction
  selectedItems: GenericDeleteItem[]
  deleteItems: UseDeleteItemsProps["deleteItems"]
  deleteFlowMessages: GenericDeleteFlowMessages
  onDeleteSuccess?: (items: { id: GenericDeleteItem["id"] }[]) => Promise<void>
  onPartialDeleteFailure?: (failedItems: GenericDeleteItem[]) => Promise<void>
}

export const GenericDeleteFlow: FunctionComponent<GenericDeleteFlowProps> = ({
  opened,
  onClose,
  selectedItems,
  deleteItems,
  deleteFlowMessages,
  onDeleteSuccess,
  onPartialDeleteFailure,
}) => {
  const [flowState, setFlowState] = useState<GenericDeleteFlowState | null>(
    opened ? GenericDeleteFlowState.ConfirmDelete : null
  )
  const [failedItems, setFailedItems] = useState<GenericDeleteItem[]>([])

  useEffect(() => {
    setFlowState(opened ? GenericDeleteFlowState.ConfirmDelete : null)
  }, [opened])

  const deleteSelectedItems = useDeleteItems({
    selectedItems,
    deleteItems,
    onDeleteSuccess,
    onSetFlowState: setFlowState,
    onSetFailedItems: setFailedItems,
    messages: deleteFlowMessages,
  })

  const confirmDelete = useCallback(() => {
    setFlowState(GenericDeleteFlowState.Deleting)
    void delayUntil(deleteSelectedItems(), 250)
  }, [deleteSelectedItems])

  const closeDeleteFailedModal = useCallback(async () => {
    onPartialDeleteFailure && (await onPartialDeleteFailure(failedItems))
    setFlowState(null)
  }, [failedItems, onPartialDeleteFailure])

  return (
    <>
      <GenericConfirmModal
        opened={flowState === GenericDeleteFlowState.ConfirmDelete}
        onClose={onClose}
        onConfirm={confirmDelete}
        onCancel={onClose}
        itemCount={selectedItems.length}
        messages={deleteFlowMessages}
      />
      <GenericProgressModal
        opened={flowState === GenericDeleteFlowState.Deleting}
        title={formatMessage(deleteFlowMessages.deletingModalTitle)}
      />
      <GenericDeleteFailedModal
        opened={flowState === GenericDeleteFlowState.DeleteFailed}
        onClose={closeDeleteFailedModal}
        messages={deleteFlowMessages}
        failedItems={failedItems}
        allItems={selectedItems}
      />
    </>
  )
}
