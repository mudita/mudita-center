import { StateProps } from "Renderer/models/notes/notes.interface"
import { Note } from "Renderer/modules/tools/tabs/notes.component"
import { makeNewNote } from "Renderer/models/notes/make-new-note"
import { Slicer } from "@rematch/select"
import { orderBy } from "lodash"
import { SortOrder } from "Common/enums/sort-order.enum"

export type NoteCallback = (param: Note) => void

export const initialState: StateProps = {
  notesList: [],
  sortOrder: SortOrder.Descending,
}

export default {
  state: initialState,
  reducers: {
    changeSortOrder(state: StateProps, sortOrder: SortOrder) {
      return { ...state, sortOrder }
    },
    createNewNote(state: StateProps, callback?: NoteCallback) {
      const oldNotes = state.notesList || []
      const newNote = makeNewNote()
      const newState = {
        ...state,
        newNoteId: newNote.id,
        notesList: [newNote, ...oldNotes],
      }
      if (callback) {
        callback(newNote)
      }
      return newState
    },
    removeNotes(state: StateProps, itemsToRemove: string[]) {
      const notes = state.notesList?.filter(
        ({ id }: Note) => !itemsToRemove.includes(id)
      )

      return {
        ...state,
        ...(state.newNoteId && itemsToRemove.includes(state.newNoteId)
          ? { newNoteId: undefined }
          : {}),
        notesList: notes,
      }
    },
    saveNote(state: StateProps, noteData: Note) {
      const modifiedNotes = state.notesList.map((note: Note) => {
        if (note.id === noteData.id) {
          return noteData
        }
        return note
      })

      if (modifiedNotes) {
        return {
          ...state,
          ...(state.newNoteId === noteData.id ? { newNoteId: undefined } : {}),
          notesList: modifiedNotes,
        }
      }
      return state
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    sortedList() {
      return slice(({ notesList, sortOrder }) => {
        return orderBy(notesList, ["date"], [sortOrder])
      })
    },
  }),
}
