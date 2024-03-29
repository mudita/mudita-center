/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "Core/data-sync/types/entity.type"
import { ContactTable } from "Core/data-sync/constants"
import { Contact } from "Core/contacts/reducers"

export type ContactObject = Contact

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

export type ContactGroupEntity = Entity<{
  name: string
}>

export type ContactMatchGroupEntity = Entity<{
  group_id: string
  contact_id: string
}>

export interface ContactInput {
  [ContactTable.Contacts]: DBQueryResult<keyof ContactEntity, string[]>
  [ContactTable.Names]: DBQueryResult<keyof ContactNameEntity, string[]>
  [ContactTable.Numbers]: DBQueryResult<keyof ContactNumberEntity, string[]>
  [ContactTable.Addresses]: DBQueryResult<keyof ContactAddressEntity, string[]>
  [ContactTable.Group]:
    | DBQueryResult<keyof ContactGroupEntity, string[]>
    | undefined
  [ContactTable.MatchGroup]:
    | DBQueryResult<keyof ContactMatchGroupEntity, string[]>
    | undefined
}
