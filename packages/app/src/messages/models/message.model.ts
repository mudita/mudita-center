/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Model, Field } from "App/core/decorators"
import { BaseModel } from "App/core/models"
import { Message } from "App/messages/dto"
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
    const threadsIndex = this.index.get(DataIndex.Thread)
    const thread = threadsIndex?.documentStore.getDoc(data.threadId)

    data.phoneNumber = thread.phoneNumber

    return data
  }
}
