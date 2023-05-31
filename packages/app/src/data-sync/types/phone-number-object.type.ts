/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "App/data-sync/types/entity.type"
import { PhoneNumberTable } from "App/data-sync/constants"
import { PhoneNumber } from "App/phone-numbers/dto"

export type PhoneNumberObject = PhoneNumber

export type PhoneNumberEntity = Entity<{
  _id: string
  contact_id: string
  number_user: string
  number_e164: string
  type: string
}>

export interface PhoneNumberInput {
  [PhoneNumberTable.Numbers]: DBQueryResult<keyof PhoneNumberEntity, string[]>
}
