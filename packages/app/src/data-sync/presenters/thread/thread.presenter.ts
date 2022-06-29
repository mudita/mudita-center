/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ThreadInput,
  ThreadObject,
  ThreadEntity,
  ContactNumberEntity,
  SmsEntity,
} from "App/data-sync/types"
import { MessageType as PureMessageType } from "@mudita/pure"
import { MessageType } from "App/messages/constants"
import { Feature, flags } from "App/feature-flags"

export class ThreadPresenter {
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

  public serializeToObject(data: ThreadInput): ThreadObject[] {
    if (!data.threads || !data.contact_number) {
      return []
    }

    const threads = this.serializeRecord<ThreadEntity>(
      data.threads.values,
      data.threads.columns
    )

    const contactNumbers = this.serializeRecord<ContactNumberEntity>(
      data.contact_number.values,
      data.contact_number.columns
    )

    const smsMessages = this.serializeRecord<SmsEntity>(
      data.sms.values,
      data.sms.columns
    )

    return threads
      .map((thread) => {
        const contactNumber = this.findRecords<ContactNumberEntity>(
          contactNumbers,
          String(thread.number_id)
        )
        const sms = this.findRecords<SmsEntity>(smsMessages, String(thread._id))

        return {
          id: thread._id,
          phoneNumber: contactNumber?.number_user,
          lastUpdatedAt: new Date(Number(thread.date) * 1000),
          messageSnippet: thread.snippet,
          unread: flags.get(Feature.ReadAndUnreadMessages)
            ? Number(thread.read) !== 0
            : false,
          messageType: ThreadPresenter.getMessageType(Number(sms!.type)),
        }
      })
      .filter((thread) => typeof thread !== "undefined") as ThreadObject[]
  }

  private static getMessageType(messageType: PureMessageType): MessageType {
    if (
      messageType === PureMessageType.QUEUED ||
      messageType === PureMessageType.OUTBOX
    ) {
      return MessageType.OUTBOX
    } else if (messageType === PureMessageType.FAILED) {
      return MessageType.FAILED
    } else {
      return MessageType.INBOX
    }
  }
}
