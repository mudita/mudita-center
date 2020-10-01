import React from "react"

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

import Notes from "Renderer/modules/tools/tabs/notes.component"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.enum"
import { notesSeed } from "App/seeds/notes"
import { NoteCallback } from "Renderer/models/notes/notes"
import { noop } from "Renderer/utils/noop"

const renderer = (props = {}) => {
  const mockNewNote = (cb: NoteCallback) => {
    cb(notesSeed.notesList[0])
  }

  const defaultProps = {
    notesList: notesSeed.notesList,
    toggleSortOrder: noop,
    sortDescending: true,
  }

  return renderWithThemeAndIntl(
    <Notes createNewNote={mockNewNote} {...defaultProps} {...props} />
  )
}

test("displays notes properly", () => {
  const { queryAllByTestId } = renderer()
  expect(queryAllByTestId(NotesTestIds.Note).length).toBe(
    notesSeed.notesList.length
  )
})

test("displays empty state when no notes are present", () => {
  const { getByTestId } = renderer({ notesList: [] })
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
  const { getByTestId } = renderer()

  expect(getByTestId(NotesTestIds.NewNoteSidebar)).toHaveStyle(
    "margin-right: -62.1rem"
  )

  getByTestId(NotesTestIds.NewNoteButton).click()

  expect(getByTestId(NotesTestIds.NewNoteSidebar)).toHaveStyle(
    "margin-right: 0rem"
  )
})

test("toggle sort order action can be performed", () => {
  const toggleSortOrder = jest.fn()
  const { getByTestId } = renderer({ toggleSortOrder })
  getByTestId(NotesTestIds.SortColumn).click()
  expect(toggleSortOrder).toBeCalled()
})
