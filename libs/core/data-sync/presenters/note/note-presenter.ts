/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NoteEntity, NoteInput, NoteObject } from "Core/data-sync/types"
import { BasePresenter } from "Core/data-sync/presenters/base-presenter"

export class NotePresenter extends BasePresenter {
  public serializeToObject(input: NoteInput): NoteObject[] {
    if (input.notes === undefined) {
      return []
    }

    const notes = this.serializeRecord<NoteEntity>(
      input.notes.values,
      input.notes.columns
    )

    // @ts-ignore
    return notes.map((note) => note)
  }
}
