import { createNewNote, notesList } from "App/__mocks__/notes"

const initalState = {
  notesList,
}

export default {
  state: initalState,
  reducers: {
    createNewNote(state: any, callback?: any) {
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
    saveNote(state: any, noteData: any) {
      const modifiedNotes = state.notesList.map((note: any) => {
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
