/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { MessageModel } from "App/messages/models"
import { Message } from "App/messages/reducers"

export class MessageRepository implements Repository {
  constructor(private messageModel: MessageModel) {}

  public get(id: Message["id"]): Message | undefined {
    return this.messageModel.findById(id)
  }

  public create(message: Message, skipCallbacks = false): void {
    this.messageModel.create(message, skipCallbacks)
  }

  public update(message: Message, skipCallbacks = false): void {
    this.messageModel.update(message, skipCallbacks)
  }

  public delete(id: Message["id"], skipCallbacks = false): void {
    this.messageModel.delete(id, skipCallbacks)
  }
}
