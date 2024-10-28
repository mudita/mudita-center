/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  UnifiedMessage,
  UnifiedMessageDeliveryStatus,
  UnifiedMessageStatus,
} from "device/models"
import { MessageObject, ThreadObject } from "Core/data-sync/types"
import { MessageType } from "Core/messages/constants"

export interface PureToUnifiedMessageOptions {
  threads: Record<string, ThreadObject>
  messages: Record<string, MessageObject>
}

export const pureToUnifiedMessage = ({
  messages,
  threads,
}: PureToUnifiedMessageOptions): UnifiedMessage[] => {
  return Object.values(messages)
    .filter((message) => message.messageType !== MessageType.DRAFT)
    .map((message) => {
      const thread = threads[message.threadId]
      if (!thread) return null

      let status: UnifiedMessageStatus
      let deliveryStatus: UnifiedMessageDeliveryStatus

      switch (message.messageType) {
        case MessageType.INBOX:
          status = "SENT"
          deliveryStatus = "DELIVERED"
          break
        case MessageType.OUTBOX:
          status = "RECEIVED"
          deliveryStatus = "NONE"
          break
        case MessageType.FAILED:
          status = "SENT"
          deliveryStatus = "FAILED"
          break
        case MessageType.QUEUED:
          status = "SENT"
          deliveryStatus = "PENDING"
          break
        default:
          status = "SENT"
          deliveryStatus = "NONE"
      }

      const address: UnifiedMessage["address"] = [
        { address: thread.phoneNumber || "" },
      ]

      const read =
        !thread.unread ||
        message.date.getTime() !== thread.lastUpdatedAt.getTime()

      return {
        id: message.id,
        body: message.content || "",
        date: message.date.getTime(),
        read,
        type: "SMS",
        address,
        status,
        deliveryStatus,
      }
    })
    .filter((message): message is UnifiedMessage => message !== null)
}
