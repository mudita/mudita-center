/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Model, Field } from "Core/core/decorators"
import { BaseModel } from "Core/core/models"
import { Contact } from "Core/contacts/dto"
import { DataIndex } from "Core/index-storage/constants"

@Model(DataIndex.Contact)
export class ContactModel extends BaseModel<Contact> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public firstName: string | undefined

  @Field()
  public lastName: string | undefined

  @Field()
  public primaryPhoneNumber: string | undefined

  @Field()
  public secondaryPhoneNumber: string | undefined

  @Field()
  public firstAddressLine: string | undefined

  @Field()
  public secondAddressLine: string | undefined

  @Field()
  public note: string | undefined

  @Field()
  public email: string | undefined
}
