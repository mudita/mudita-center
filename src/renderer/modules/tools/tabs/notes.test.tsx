import React from "react"

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

import Notes from "Renderer/modules/tools/tabs/notes-ui.component"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.interface"
import { notesList } from "App/__mocks__/notes"

const renderer = (data = notesList) =>
  renderWithThemeAndIntl(<Notes notesList={data} />)

test("displays notes properly", () => {
  const { queryAllByTestId } = renderer()

  expect(queryAllByTestId(NotesTestIds.Note).length).toBe(notesList.length)
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
