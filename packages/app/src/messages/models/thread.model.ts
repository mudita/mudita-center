/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Model, Field } from "App/core/decorators"
import { BaseModel } from "App/core/models"
import { Thread } from "App/messages/dto"
import { DataIndex } from "App/index-storage/constants"

@Model(DataIndex.Thread)
export class ThreadModel extends BaseModel<Thread> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public phoneNumber: string | undefined

  @Field()
  public lastUpdatedAt: Date | undefined

  @Field()
  public messageSnippet: string | undefined

  @Field()
  public unread: boolean | undefined
}
