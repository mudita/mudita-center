/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { StateProps } from "Renderer/models/notes/notes.interface"
import { Note } from "Renderer/modules/tools/tabs/notes.component"
import { makeNewNote } from "Renderer/models/notes/make-new-note"
import { Slicer } from "@rematch/select"
import { orderBy } from "lodash"
import { SortOrder } from "Common/enums/sort-order.enum"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"

export type NoteCallback = (param: Note) => void

export const initialState: StateProps = {
  notes: [],
  sortOrder: SortOrder.Descending,
}

const notes = createModel<RootModel>({
  state: initialState,
  reducers: {
    changeSortOrder(state: StateProps, sortOrder: SortOrder) {
      return { ...state, sortOrder }
    },
    createNewNote(state: StateProps, callback?: NoteCallback) {
      const oldNotes = state.notes || []
      const newNote = makeNewNote()
      const newState = {
        ...state,
        newNoteId: newNote.id,
        notes: [newNote, ...oldNotes],
      }
      if (callback) {
        callback(newNote)
      }
      return newState
    },
    removeNotes(state: StateProps, itemsToRemove: string[]) {
      const notes = state.notes?.filter(
        ({ id }: Note) => !itemsToRemove.includes(id)
      )

      return {
        ...state,
        ...(state.newNoteId && itemsToRemove.includes(state.newNoteId)
          ? { newNoteId: undefined }
          : {}),
        notes,
      }
    },
    saveNote(state: StateProps, noteData: Note) {
      const modifiedNotes = state.notes.map((note: Note) => {
        if (note.id === noteData.id) {
          return noteData
        }
        return note
      })

      if (modifiedNotes) {
        return {
          ...state,
          newNoteId:
            state.newNoteId === noteData.id ? undefined : state.newNoteId,
          notes: modifiedNotes,
        }
      }
      return state
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    sortedNotes() {
      return slice(({ notes, sortOrder }) => {
        return orderBy(notes, ["date"], [sortOrder])
      })
    },
  }),
})

export default notes
