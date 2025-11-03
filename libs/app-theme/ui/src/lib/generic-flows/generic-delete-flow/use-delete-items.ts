/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { formatMessage, Messages } from "app-localize/utils"
import { delayUntil } from "app-utils/common"
import { useToastContext } from "../../toast/toast"
import { createToastContent } from "../../shared/create-toast-content"
import {
  GenericDeleteFlowState,
  GenericDeleteItem,
} from "./generic-delete-flow.types"

export interface UseDeleteItemsProps {
  selectedItems: GenericDeleteItem[]
  deleteItems: (itemIds: string[]) => Promise<{ failedIds: string[] }>
  onDeleteSuccess?: (items: GenericDeleteItem[]) => Promise<void>
  onSetFlowState: (state: GenericDeleteFlowState | null) => void
  onSetFailedItems: (items: GenericDeleteItem[]) => void
  messages: {
    deleteSuccessToastText: Messages
  }
}

export const useDeleteItems = ({
  selectedItems,
  deleteItems,
  onDeleteSuccess,
  onSetFlowState,
  onSetFailedItems,
  messages,
}: UseDeleteItemsProps) => {
  const { addToast } = useToastContext()

  return useCallback(async () => {
    const deleteProcess = async () => {
      const itemIds = selectedItems.map((item) => item.id)
      const { failedIds } = await deleteItems(itemIds)
      return selectedItems.filter(({ id }) => failedIds.includes(id))
    }

    let failedItems: GenericDeleteItem[]

    try {
      failedItems = await delayUntil(deleteProcess(), 500)
    } catch {
      failedItems = selectedItems
    }

    if (failedItems.length > 0) {
      onSetFailedItems(failedItems)
      onSetFlowState(GenericDeleteFlowState.DeleteFailed)
      return
    }

    if (onDeleteSuccess) {
      await onDeleteSuccess(selectedItems)
    }

    addToast(
      createToastContent({
        text: formatMessage(messages.deleteSuccessToastText, {
          itemCount: selectedItems.length,
        }),
      })
    )

    onSetFlowState(null)
  }, [
    onDeleteSuccess,
    addToast,
    messages.deleteSuccessToastText,
    selectedItems,
    onSetFlowState,
    deleteItems,
    onSetFailedItems,
  ])
}
