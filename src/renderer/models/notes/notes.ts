import { createNewNote, notesList } from "App/__mocks__/notes"
import { StateProps } from "Renderer/models/notes/notes.interface"
import { Note } from "Renderer/modules/tools/tabs/notes-ui.component"

export type NoteCallback = (param: Note) => void

const initalState: StateProps = {
  notesList,
}

export default {
  state: initalState,
  reducers: {
    createNewNote(state: StateProps, callback?: NoteCallback) {
      const oldNotes = state.notesList || []
      const newState = {
        ...state,
        notesList: [createNewNote(), ...oldNotes],
      }
      if (callback) {
        callback(newState.notesList[0])
      }
      return newState
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
