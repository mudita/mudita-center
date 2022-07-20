/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import Notes from "App/__deprecated__/renderer/modules/tools/tabs/notes.component"
import { NotesTestIds } from "App/__deprecated__/renderer/modules/tools/tabs/notes.enum"
import { notesSeed } from "App/__deprecated__/seeds/notes"
import { NoteCallback } from "App/__deprecated__/renderer/models/notes/notes"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { SortOrder } from "App/__deprecated__/common/enums/sort-order.enum"
import fn = jest.fn

const renderer = (props = {}) => {
  const mockNewNote = (cb: NoteCallback) => {
    cb(notesSeed.notes[0])
  }

  const defaultProps = {
    notes: notesSeed.notes,
    changeSortOrder: noop,
    sortOrder: SortOrder.Descending,
  }

  return renderWithThemeAndIntl(
    <Notes
      saveNote={fn}
      onRemoveNotes={fn}
      createNewNote={mockNewNote}
      {...defaultProps}
      {...props}
    />
  )
}

test("displays notes properly", () => {
  const { queryAllByTestId } = renderer()
  expect(queryAllByTestId(NotesTestIds.Note).length).toBe(
    notesSeed.notes.length
  )
})

test("displays empty state when no notes are present", () => {
  const { getByTestId } = renderer({ notes: [] })
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

test("sort order changes from descending to ascending", () => {
  const changeSortOrder = jest.fn()
  const { getByTestId } = renderer({ changeSortOrder })
  getByTestId(NotesTestIds.SortColumn).click()
  expect(changeSortOrder).toBeCalledWith(SortOrder.Ascending)
})

test("sort order changes from ascending to descending", () => {
  const changeSortOrder = jest.fn()
  const { getByTestId } = renderer({
    changeSortOrder,
    sortOrder: SortOrder.Ascending,
  })
  getByTestId(NotesTestIds.SortColumn).click()
  expect(changeSortOrder).toBeCalledWith(SortOrder.Descending)
})
