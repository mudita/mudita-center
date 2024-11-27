/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedNote } from "device/models"
import { NoteTable } from "Core/data-sync/constants"
import { Entity, DBQueryResult } from "Core/data-sync/types/entity.type"

export type NoteObject = UnifiedNote

export type NoteEntity = Entity<{
  _id: string
  date: string
  snippet: string
}>

export interface NoteInput {
  [NoteTable.Notes]: DBQueryResult<keyof NoteEntity, string[]> | undefined
}
