/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "Core/core/types"
import { ThreadModel } from "Core/messages/models"
import { Thread } from "Core/messages/dto"

export class ThreadRepository implements Repository {
  constructor(private threadModel: ThreadModel) {}

  public findById(id: string): Thread | undefined {
    return this.threadModel.findById(id)
  }

  public create(thread: Thread, skipCallbacks = false): Thread | undefined {
    return this.threadModel.create(thread, skipCallbacks)
  }

  public update(thread: Thread, skipCallbacks = false): Thread | undefined {
    return this.threadModel.update(thread, skipCallbacks)
  }

  public delete(id: Thread["id"], skipCallbacks = false): void {
    this.threadModel.delete(id, skipCallbacks)
  }
}
