/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { theme } from "app-theme/utils"
import { formatMessage, Messages } from "app-localize/utils"
import { GenericProgressModal } from "../../generic-modals/generic-progress-modal"
import { GenericConfirmModal } from "../../generic-modals/generic-confirm-modal/generic-confirm-modal"
import { GenericConfirmModalProps } from "../../generic-modals/generic-confirm-modal/generic-confirm-modal.types"
import {
  GenericDeleteFailedModal,
  GenericDeleteFailedModalProps,
} from "./generic-delete-failed-modal"
import {
  GenericDeleteFlowState,
  GenericDeleteItem,
} from "./generic-delete-flow.types"
import { useDeleteItems, UseDeleteItemsProps } from "./use-delete-items"

type GenericDeleteConfirmModal = {
  confirmDeleteModalTitle: Messages
  confirmDeleteModalDescription: Messages
  confirmDeleteModalConfirmButtonText: Messages
  confirmDeleteModalCancelButtonText: Messages
}

type GenericDeleteFlowMessages = GenericDeleteConfirmModal &
  GenericDeleteFailedModalProps["messages"] &
  UseDeleteItemsProps["messages"] & {
    deletingModalTitle: Messages
  }

export interface GenericDeleteFlowProps {
  deleteItemsAction: UseDeleteItemsProps["deleteItemsAction"]
  deleteFlowMessages: GenericDeleteFlowMessages
  onDeleteSuccess?: (items: {
    allItems: GenericDeleteItem[]
    failedItems?: GenericDeleteItem[]
  }) => Promise<void>
  ref?: RefObject<{
    deleteItems: (items: GenericDeleteItem[]) => void
  } | null>
}

export const GenericDeleteFlow: FunctionComponent<GenericDeleteFlowProps> = ({
  deleteItemsAction,
  deleteFlowMessages,
  onDeleteSuccess,
  ref,
}) => {
  const [flowState, setFlowState] = useState<GenericDeleteFlowState>()
  const [selectedItems, setSelectedItems] = useState<GenericDeleteItem[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const onClose = useCallback(() => {
    setFlowState(undefined)

    timeoutRef.current = setTimeout(() => {
      setSelectedItems([])
    }, theme.app.constants.modalTransitionDuration)
  }, [])

  const onStart = useCallback(() => {
    setFlowState(GenericDeleteFlowState.Deleting)
  }, [])

  const onSuccess: UseDeleteItemsProps["onSuccess"] = useCallback(
    ({ allItems, failedItems }) => {
      if (failedItems) {
        setFlowState(GenericDeleteFlowState.DeleteFailed)
        onDeleteSuccess?.({ allItems, failedItems })
      } else {
        onDeleteSuccess?.({ allItems })
        onClose()
      }
    },
    [onClose, onDeleteSuccess]
  )

  const { deleteItems, failedItems, allItems } = useDeleteItems({
    deleteItemsAction,
    onStart,
    onSuccess,
    messages: deleteFlowMessages,
  })

  const onConfirm = useCallback(async () => {
    deleteItems(selectedItems)
  }, [deleteItems, selectedItems])

  useImperativeHandle(ref, () => ({
    deleteItems: (items: GenericDeleteItem[]) => {
      setSelectedItems(items)
      setFlowState(GenericDeleteFlowState.ConfirmDelete)
    },
  }))

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <GenericConfirmModal
        opened={flowState === GenericDeleteFlowState.ConfirmDelete}
        onConfirm={onConfirm}
        onCancel={onClose}
        itemCount={selectedItems.length}
        messages={mapDeleteToGenericModalMessages(deleteFlowMessages)}
      />
      <GenericProgressModal
        opened={flowState === GenericDeleteFlowState.Deleting}
        title={formatMessage(deleteFlowMessages.deletingModalTitle)}
      />
      <GenericDeleteFailedModal
        opened={flowState === GenericDeleteFlowState.DeleteFailed}
        onClose={onClose}
        messages={deleteFlowMessages}
        failedItems={failedItems}
        allItems={allItems}
      />
    </>
  )
}
// eslint-disable-next-line no-redeclare
export type GenericDeleteFlow = NonNullable<
  GenericDeleteFlowProps["ref"]
>["current"]

const mapDeleteToGenericModalMessages = (
  messages: GenericDeleteConfirmModal
): GenericConfirmModalProps["messages"] => ({
  confirmModalTitle: messages.confirmDeleteModalTitle,
  confirmModalDescription: messages.confirmDeleteModalDescription,
  confirmModalConfirmButtonText: messages.confirmDeleteModalConfirmButtonText,
  confirmModalCancelButtonText: messages.confirmDeleteModalCancelButtonText,
})
