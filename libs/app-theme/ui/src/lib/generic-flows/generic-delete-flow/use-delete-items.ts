/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { formatMessage, Messages } from "app-localize/utils"
import { delayUntil } from "app-utils/common"
import { useToastContext } from "../../toast/toast"
import { createToastContent } from "../../shared/create-toast-content"
import { GenericDeleteItem } from "./generic-delete-flow.types"
import { useMutation } from "@tanstack/react-query"

export interface UseDeleteItemsProps {
  deleteItemsAction: (itemIds: string[]) => Promise<{ failedIds: string[] }>
  onStart: VoidFunction
  onSuccess: (params: {
    allItems: GenericDeleteItem[]
    failedItems?: GenericDeleteItem[]
  }) => void
  messages: {
    deleteSuccessToastText: Messages
  }
}

export const useDeleteItems = ({
  deleteItemsAction,
  onStart,
  onSuccess,
  messages,
}: UseDeleteItemsProps) => {
  const { addToast } = useToastContext()

  const mutation = useMutation({
    mutationFn: async (items: GenericDeleteItem[]) => {
      const deleteProcess = async () => {
        const itemIds = items.map((item) => item.id)
        const { failedIds } = await deleteItemsAction(itemIds)
        return items.filter(({ id }) => failedIds.includes(id))
      }

      try {
        return await delayUntil(deleteProcess(), 500)
      } catch {
        return items
      }
    },
    onMutate: () => {
      onStart()
    },
    onSuccess: async (failedItems, allItems) => {
      if (failedItems.length === 0) {
        onSuccess({ allItems })
        addToast(
          createToastContent({
            text: formatMessage(messages.deleteSuccessToastText, {
              itemCount: allItems.length,
            }),
          })
        )
      } else {
        onSuccess({ allItems, failedItems })
      }
    },
  })

  return {
    deleteItems: mutation.mutate,
    allItems: mutation.variables || [],
    failedItems: mutation.data || [],
  }
}
