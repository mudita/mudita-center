import { createEmptyNote, notesList } from "App/__mocks__/notes"

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
        notesList: [createEmptyNote(), ...oldNotes],
      }
      if (callback) {
        callback(newState.notesList[0])
      }
      return newState
    },
  },
}
