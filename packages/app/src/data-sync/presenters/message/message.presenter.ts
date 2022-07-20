/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageType as PureMessageType } from "@mudita/pure"
import { MessageType } from "App/messages/constants"
import {
  MessageInput,
  MessageObject,
  SmsEntity,
  ContactNumberEntity,
  ThreadEntity,
} from "App/data-sync/types"

export class MessagePresenter {
  public findRecords<Type extends { _id: string }>(
    data: { _id: string }[],
    recordId: string
  ): Type | undefined {
    return (data as unknown as Type[]).find((item) => item._id === recordId)
  }

  public serializeRecord<Type>(values: string[][], columns: string[]): Type[] {
    return values.map((item) => {
      return columns.reduce((acc: Record<string, string>, value, index) => {
        acc[value.trim()] = String(item[index]).trim()
        return acc
      }, {})
    }) as unknown as Type[]
  }

  public serializeToObject(data: MessageInput): MessageObject[] {
    if (!data.sms || !data.contact_number) {
      return []
    }

    const sms = this.serializeRecord<SmsEntity>(
      data.sms.values,
      data.sms.columns
    )
    const threads = this.serializeRecord<ThreadEntity>(
      data.threads.values,
      data.threads.columns
    )
    const contactNumbers = this.serializeRecord<ContactNumberEntity>(
      data.contact_number.values,
      data.contact_number.columns
    )

    return sms
      .map((message) => {
        const thread = this.findRecords<ThreadEntity>(
          threads,
          String(message.thread_id)
        )
        const contactNumber = this.findRecords<ContactNumberEntity>(
          contactNumbers,
          String(thread?.number_id)
        )

        return {
          id: message._id,
          date: new Date(Number(message.date) * 1000),
          content: message.body,
          phoneNumber: contactNumber?.number_user,
          threadId: String(message.thread_id),
          messageType: MessagePresenter.getMessageType(Number(message.type)),
        }
      })
      .filter((message) => typeof message !== "undefined") as MessageObject[]
  }

  private static getMessageType(messageType: PureMessageType): MessageType {
    if (
      messageType === PureMessageType.QUEUED ||
      messageType === PureMessageType.OUTBOX
    ) {
      return MessageType.OUTBOX
    } else if (messageType === PureMessageType.FAILED) {
      return MessageType.FAILED
    } else if (messageType === PureMessageType.DRAFT) {
      return MessageType.DRAFT
    } else {
      return MessageType.INBOX
    }
  }
}
