/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import selectPlugin from "@rematch/select"
import notes from "App/__deprecated__/renderer/models/notes/notes"
import { Note } from "App/__deprecated__/renderer/modules/tools/tabs/notes.component"
import { notesSeed, todaysNote } from "App/__deprecated__/seeds/notes"
import { SortOrder } from "App/__deprecated__/common/enums/sort-order.enum"

const storeConfig = {
  models: { notes },
  plugins: [selectPlugin()],
  redux: {
    initialState: {
      notes: notesSeed,
    },
  },
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

const testContent = "test-content"
const testDate = new Date("2020-07-21T13:08:02.733Z")

test("properly fires callback", () => {
  const mockCb = jest.fn()
  store.dispatch.notes.createNewNote(mockCb)
  expect(mockCb).toBeCalled()
})

test("properly saves new note", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const currentNewestNote = store.getState().notes.notes[0]
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const currentNotesCount = store.getState().notes.notes.length
  store.dispatch.notes.createNewNote()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().notes.notes[0]).not.toMatchObject(currentNewestNote)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-plus-operands
  expect(store.getState().notes.notes.length).toBe(currentNotesCount + 1)
})

test("properly saves modified note", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const noteId = store.getState().notes.notes[0].id
  const findById = ({ id }: Note) => id === noteId
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-call
  expect(store.getState().notes.notes.find(findById)!.content).not.toBe(
    testContent
  )
  store.dispatch.notes.saveNote({
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: noteId,
    content: testContent,
    date: testDate,
  })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-call
  expect(store.getState().notes.notes.find(findById)!.content).toBe(testContent)
})

test("properly removes notes", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const noteId = store.getState().notes.notes[0].id
  expect(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    store.getState().notes.notes.find(({ id }: Note) => id === noteId)
  ).toBeDefined()

  store.dispatch.notes.removeNotes([noteId])

  expect(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    store.getState().notes.notes.find(({ id }: Note) => id === noteId)
  ).toBeUndefined()
})

test("properly removed multiple notes", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const ids = store
    .getState()
    .notes.notes.slice(0, 3)
    .map(({ id }: Note) => id)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().notes.notes.length).toBe(notesSeed.notes.length)

  store.dispatch.notes.removeNotes(ids)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(store.getState().notes.notes.length).toBe(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    notesSeed.notes.length - ids.length
  )
})

test("today's note is at the beginning of the list by default, after toggle is placed at the last place in the list", () => {
  const state = store.getState()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const notes = store.select.notes.sortedNotes(state)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(state.notes.sortOrder).toEqual(SortOrder.Descending)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(todaysNote).toMatchObject(notes[0])

  store.dispatch.notes.changeSortOrder(SortOrder.Ascending)

  const stateAfterToggle = store.getState()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const notesAfterToggle = store.select.notes.sortedNotes(stateAfterToggle)
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(stateAfterToggle.notes.sortOrder).toEqual(SortOrder.Ascending)
  expect(todaysNote).toMatchObject(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    notesAfterToggle[notesAfterToggle.length - 1]
  )
})
