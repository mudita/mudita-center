/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { Model, Field } from "Core/core/decorators"
import { BaseModel } from "Core/core/models"
import { Message, Thread } from "Core/messages/dto"
import { MessageType } from "Core/messages/constants"
import { DataIndex } from "Core/index-storage/constants"

@Model(DataIndex.Message)
export class MessageModel extends BaseModel<Message> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public date: Date | undefined

  @Field()
  public content: string | undefined

  @Field()
  public phoneNumber: string | undefined

  @Field()
  public threadId: string | undefined

  @Field()
  public messageType: string | undefined

  public beforeCreate(data: Message): Message {
    const { thread, index } = this.getThread(data)
    this.updateThreadSnippet(data, index, thread)

    data.phoneNumber = thread.phoneNumber

    return data
  }

  public beforeUpdate(data: Message): Message {
    const { thread, index } = this.getThread(data)
    this.updateThreadSnippet(data, index, thread)

    return data
  }

  public afterDelete(data: Message): void {
    const anyMessageInThread = this.connection?.search(data.threadId, {
      fields: {
        threadId: { boost: 1 },
      },
    })

    if (anyMessageInThread !== undefined && anyMessageInThread?.length > 0) {
      return
    }

    const threadsIndex = this.index.get(DataIndex.Thread)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const thread = threadsIndex?.documentStore.getDoc(data.threadId)

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    threadsIndex?.removeDocByRef(thread.id)
  }

  private getThread(data: Message): { thread: Thread; index: Index<Thread> } {
    const threadsIndex = this.index.get(DataIndex.Thread) as Index<Thread>
    const thread = threadsIndex?.documentStore.getDoc(data.threadId)

    return { thread, index: threadsIndex }
  }

  private updateThreadSnippet(
    message: Message,
    index: Index<Thread>,
    thread: Thread
  ): void {
    if (message.messageType === MessageType.DRAFT) {
      thread.messageSnippet = [
        ...(message.messageType === MessageType.DRAFT ? ["Draft"] : []),
        message.content,
      ].join(": ")

      index?.updateDoc(thread)
    }
  }
}
