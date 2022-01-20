/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  MessageInput,
  MessageObject,
  SmsEntity,
  ContactNumberEntity,
} from "App/data-sync/types"
import { MessageType } from "App/messages"

export class MessagePresenter {
  public findRecords<Type extends { contact_id: string }>(
    data: { contact_id: string }[],
    contactId: string
  ): Type | undefined {
    return (data as unknown as Type[]).find(
      (item) => item.contact_id === contactId
    )
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
    const sms = this.serializeRecord<SmsEntity>(
      data.sms.values,
      data.sms.columns
    )
    const contactNumbers = this.serializeRecord<ContactNumberEntity>(
      data.contact_number.values,
      data.contact_number.columns
    )

    return sms
      .map((message) => {
        const contactNumber = this.findRecords<ContactNumberEntity>(
          contactNumbers,
          String(message.contact_id)
        )

        return {
          id: message._id,
          date: new Date(message.date),
          content: message.body,
          phoneNumber: contactNumber?.number_user,
          threadId: String(message.thread_id),
          messageType:
            message.type === 1 ? MessageType.INBOX : MessageType.OUTBOX,
        }
      })
      .filter((message) => typeof message !== "undefined") as MessageObject[]
  }
}
