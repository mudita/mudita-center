/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Model, Field } from "App/core/decorators"
import { BaseModel } from "App/core/models"
import { PhoneNumber } from "App/messages/dto"
import { DataIndex } from "App/index-storage/constants"

@Model(DataIndex.PhoneNumber)
export class PhoneNumberModel extends BaseModel<PhoneNumber> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public number: string | undefined

  public afterDelete(data: PhoneNumber): void {}

  public beforeCreate(data: PhoneNumber): PhoneNumber {
    return data
  }

  public beforeUpdate(data: PhoneNumber): PhoneNumber {
    return data
  }
}
