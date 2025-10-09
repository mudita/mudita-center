/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback } from "react"
import { formatMessage, Messages } from "app-localize/utils"
import { useToastContext } from "../../toast/toast"
import { createToastContent } from "../../shared/create-toast-content"
import {
  GenericDeleteFlowState,
  GenericDeleteItem,
} from "./generic-delete-flow.types"
import { delayUntil } from "app-utils/common"

export interface UseDeleteItemsHandlerProps {
  selectedItems: GenericDeleteItem[]
  deleteItem: (itemId: string) => Promise<void>
  onDeleteSuccess?: (items: GenericDeleteItem[]) => Promise<void>
  onSetFlowState: (state: GenericDeleteFlowState | null) => void
  onSetFailedItems: (items: GenericDeleteItem[]) => void
  messages: {
    deleteSuccessToastText: Messages
  }
}

export const useDeleteItemsHandler = ({
  selectedItems,
  deleteItem,
  onDeleteSuccess,
  onSetFlowState,
  onSetFailedItems,
  messages,
}: UseDeleteItemsHandlerProps) => {
  const { addToast } = useToastContext()

  return useCallback(async () => {
    const failedItems: GenericDeleteItem[] = []

    const deleteProcess = async () => {
      for (const item of selectedItems) {
        if (!item) continue

        try {
          await deleteItem(item.id)
        } catch {
          failedItems.push(item)
        }
      }
    }

    await delayUntil(deleteProcess(), 500)

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
    deleteItem,
    onSetFailedItems,
  ])
}
