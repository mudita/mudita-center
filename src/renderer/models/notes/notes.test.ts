import { init } from "@rematch/core"
import notes from "Renderer/models/notes/notes"
import { Note } from "Renderer/modules/tools/tabs/notes-ui.component"

let store = init({
  models: { notes },
})

beforeEach(() => {
  store = init({
    models: { notes },
  })
})

const testContent = "test-content"
const testDate = new Date("2020-07-21T13:08:02.733Z")

test("properly fires callback", () => {
  const mockCb = jest.fn()
  store.dispatch.notes.createNewNote(mockCb)
  expect(mockCb).toBeCalled()
})

test("properly saves new note", () => {
  const currentNewestNote = store.getState().notes.notesList[0]
  const currentNotesCount = store.getState().notes.notesList.length
  store.dispatch.notes.createNewNote()
  expect(store.getState().notes.notesList![0]).not.toMatchObject(
    currentNewestNote
  )
  expect(store.getState().notes.notesList.length).toBe(currentNotesCount + 1)
})

test("properly saves modified note", () => {
  const noteId = store.getState().notes.notesList[0].id
  const findById = ({ id }: Note) => id === noteId
  expect(store.getState().notes.notesList.find(findById)!.content).not.toBe(
    testContent
  )
  store.dispatch.notes.saveNote({
    id: noteId,
    content: testContent,
    date: testDate,
  })
  expect(store.getState().notes.notesList.find(findById)!.content).toBe(
    testContent
  )
})
