import React from "react"

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

import Notes from "Renderer/modules/tools/tabs/notes-ui.component"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.enum"
import { notesSeed } from "App/seeds/notes"
import { NoteCallback } from "Renderer/models/notes/notes"

const renderer = (data = notesSeed.notesList.slice(0, 2)) => {
  const mockNewNote = (cb: NoteCallback) => {
    cb(notesSeed.notesList[0])
  }

  return renderWithThemeAndIntl(
    <Notes notesList={data} newNote={mockNewNote} />
  )
}

test("displays notes properly", () => {
  const { queryAllByTestId } = renderer()

  expect(queryAllByTestId(NotesTestIds.Note).length).toBe(
    notesSeed.notesList.length
  )
})

test("displays empty state when no notes are present", () => {
  const { getByTestId } = renderer([])

  expect(getByTestId(NotesTestIds.Empty)).toBeInTheDocument()
})

test("shows selection manager and search element when at least one element is checked", () => {
  const { queryAllByTestId, queryByTestId } = renderer()
  const checkbox = queryAllByTestId(NotesTestIds.Checkbox)[0]

  expect(queryByTestId(NotesTestIds.SelectionElement)).not.toBeInTheDocument()
  expect(queryByTestId(NotesTestIds.SearchElement)).toBeInTheDocument()

  checkbox.click()

  expect(queryByTestId(NotesTestIds.SelectionElement)).toBeInTheDocument()
  expect(queryByTestId(NotesTestIds.SearchElement)).not.toBeInTheDocument()
})

test("shows sidebar to add a new note", () => {
  const { queryByTestId, getByTestId } = renderer()

  expect(queryByTestId(NotesTestIds.NewNoteSidebar)).not.toBeInTheDocument()

  getByTestId(NotesTestIds.NewNoteButton).click()

  expect(getByTestId(NotesTestIds.NewNoteSidebar)).toBeInTheDocument()
})
