/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { ThreadModel } from "App/messages/models"
import { Thread } from "App/messages/reducers"
import { Thread as ThreadDto } from "App/messages/dto"

export class ThreadRepository implements Repository {
  constructor(private threadModel: ThreadModel) {}

  public create(thread: Thread, skipCallbacks = false): ThreadDto | undefined {
    return this.threadModel.create(thread, skipCallbacks)
  }

  public update(thread: Thread, skipCallbacks = false): ThreadDto | undefined {
    return this.threadModel.update(thread, skipCallbacks)
  }

  public delete(id: Thread["id"], skipCallbacks = false): void {
    this.threadModel.delete(id, skipCallbacks)
  }
}
