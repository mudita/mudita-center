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

    return notes.map((note) => {
      const id = String(note._id)
      const content = note.snippet || ""
      const createDate = note.date ? parseInt(note.date, 10) * 1000 : 0
      const updateDate = createDate
      const isPinned = false

      return {
        id,
        content,
        createDate,
        updateDate,
        isPinned,
      }
    })
  }
}
