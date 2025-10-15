/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import { formatMessage, Messages } from "app-localize/utils"
import {
  FailedItem,
  GenericFailedModal,
} from "../../generic-modals/generic-failed-modal"

export interface GenericDeleteFailedModalProps {
  opened: boolean
  onClose: VoidFunction
  failedItems: FailedItem[]
  allItems: unknown[]
  messages: {
    deleteFailedAllModalTitle: Messages
    deleteFailedSomeModalTitle: Messages
    deleteFailedAllModalDescription: Messages
    deleteFailedDescriptionModalDescription: Messages
    deleteFailedModalCloseButtonText: Messages
    deleteSuccessToastText: Messages
  }
}

export const GenericDeleteFailedModal: FunctionComponent<
  GenericDeleteFailedModalProps
> = ({ opened, onClose, failedItems, allItems, messages }) => {
  const total = allItems.length
  const failedCount = failedItems.length
  const isAllFailed = total === failedCount
  const succeededCount = total - failedCount

  const title = useMemo(
    () =>
      isAllFailed
        ? formatMessage(messages.deleteFailedAllModalTitle, { failedCount })
        : formatMessage(messages.deleteFailedSomeModalTitle),
    [isAllFailed, messages, failedCount]
  )

  const description = useMemo(
    () =>
      isAllFailed
        ? formatMessage(messages.deleteFailedAllModalDescription, {
            failedCount,
          })
        : formatMessage(messages.deleteFailedDescriptionModalDescription, {
            failedCount,
            succeededCount,
          }),
    [isAllFailed, messages, failedCount, succeededCount]
  )

  const failedItemsList = total > 1 && !isAllFailed ? failedItems : undefined

  return (
    <GenericFailedModal
      opened={opened}
      onClose={onClose}
      title={title}
      description={description}
      buttonText={formatMessage(messages.deleteFailedModalCloseButtonText)}
      failedItems={failedItemsList}
    />
  )
}
