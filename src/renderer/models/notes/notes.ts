import { StateProps } from "Renderer/models/notes/notes.interface"
import { Note } from "Renderer/modules/tools/tabs/notes-ui.component"
import { makeNewNote } from "Renderer/models/notes/make-new-note"

export type NoteCallback = (param: Note) => void

export const initialState: StateProps = {
  notesList: [],
}

export default {
  state: initialState,
  reducers: {
    createNewNote(state: StateProps, callback?: NoteCallback) {
      const oldNotes = state.notesList || []
      const newState = {
        ...state,
        notesList: [makeNewNote(), ...oldNotes],
      }
      if (callback) {
        callback(newState.notesList[0])
      }
      return newState
    },
    removeNotes(state: StateProps, itemsToRemove: string[]) {
      const notes = state.notesList?.filter(
        ({ id }: Note) => !itemsToRemove.includes(id)
      )

      return {
        ...state,
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
          notesList: modifiedNotes,
        }
      }
      return state
    },
  },
}
