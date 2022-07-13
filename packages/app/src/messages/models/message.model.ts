/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { Model, Field } from "App/core/decorators"
import { BaseModel } from "App/core/models"
import { Message, Thread } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import { DataIndex } from "App/index-storage/constants"

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
    const thread = threadsIndex?.documentStore.getDoc(data.threadId)

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
        message.messageType === MessageType.DRAFT ? "Draft" : "",
        message.content,
      ].join(": ")

      index?.updateDoc(thread)
    }
  }
}
