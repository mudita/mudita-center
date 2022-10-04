/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ThreadInput,
  ThreadObject,
  ThreadEntity,
  ContactNumberEntity,
  ContactNameEntity,
  SmsEntity,
} from "App/data-sync/types"
import { MessageType as PureMessageType } from "@mudita/pure"
import { MessageType } from "App/messages/constants"
import { Feature, flags } from "App/feature-flags"

export class ThreadPresenter {
  private findRecords<Type extends { _id: string }>(
    data: { _id: string }[],
    recordId: string
  ): Type | undefined {
    return (data as unknown as Type[]).find((item) => item._id === recordId)
  }

  private getLastSmsInThread(
    data: SmsEntity[],
    recordId: string
  ): SmsEntity | undefined {
    return data.filter((item) => item.thread_id === recordId).reverse()[0]
  }

  private getContactName(
    data: ContactNameEntity[],
    recordId: string
  ): ContactNameEntity | undefined {
    return data.filter((item) => item.contact_id === recordId).reverse()[0]
  }

  private serializeRecord<Type>(values: string[][], columns: string[]): Type[] {
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

    const contactNames = data.contact_name
      ? this.serializeRecord<ContactNameEntity>(
          data.contact_name.values,
          data.contact_name.columns
        )
      : []

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
        const sms = this.getLastSmsInThread(smsMessages, String(thread._id))
        const contact = this.getContactName(
          contactNames,
          String(contactNumber?.contact_id)
        )

        return {
          id: thread._id,
          contactId: contact?.contact_id,
          contactName: contact
            ? [contact?.name_primary, contact?.name_alternative].join(" ")
            : "",
          phoneNumber: contactNumber?.number_user,
          lastUpdatedAt: new Date(Number(thread.date) * 1000),
          messageSnippet: sms ? this.buildMessageSnippet(sms) : "",
          unread: flags.get(Feature.ReadAndUnreadMessages)
            ? Number(thread.read) !== 0
            : false,
          messageType: sms
            ? ThreadPresenter.getMessageType(Number(sms.type))
            : MessageType.OUTBOX,
        }
      })
      .filter((thread) => typeof thread !== "undefined") as ThreadObject[]
  }

  private buildMessageSnippet(lastSms: SmsEntity): string {
    return [...(lastSms.type === "1" ? ["Draft"] : []), lastSms.body].join(": ")
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
