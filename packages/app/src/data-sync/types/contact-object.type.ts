/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "App/data-sync/types/entity.type"
import { ContactTable } from "App/data-sync/constants"

export interface ContactObject {
  id: string
  firstName: string
  lastName: string
  numbers: string[]
  address: string
  note: string
  email: string
}

export type ContactEntity = Entity<{
  name_id: string
  numbers_id: string
  ring_id: string
  address_id: string
  speeddial: string
}>

export type ContactNameEntity = Entity<{
  contact_id: string
  name_primary: string
  name_alternative: string
}>

export type ContactNumberEntity = Entity<{
  contact_id: string
  number_user: string
  number_e164: string
  type: string
}>

export type ContactAddressEntity = Entity<{
  contact_id: string
  address: string
  note: string
  mail: string
}>

export interface ContactInput {
  [ContactTable.Contacts]: DBQueryResult<keyof ContactEntity, string[]>
  [ContactTable.Names]: DBQueryResult<keyof ContactNameEntity, string[]>
  [ContactTable.Numbers]: DBQueryResult<keyof ContactNumberEntity, string[]>
  [ContactTable.Addresses]: DBQueryResult<keyof ContactAddressEntity, string[]>
}
