/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ThreadInput,
  ThreadObject,
  ThreadEntity,
  ContactNumberEntity,
} from "App/data-sync/types"

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

    return threads
      .map((thread) => {
        const contactNumber = this.findRecords<ContactNumberEntity>(
          contactNumbers,
          String(thread.number_id)
        )

        return {
          id: thread._id,
          phoneNumber: contactNumber?.number_user,
          lastUpdatedAt: new Date(Number(thread.date) * 1000),
          messageSnippet: thread.snippet,
          unread: Number(thread.read) !== 0,
        }
      })
      .filter((thread) => typeof thread !== "undefined") as ThreadObject[]
  }
}
