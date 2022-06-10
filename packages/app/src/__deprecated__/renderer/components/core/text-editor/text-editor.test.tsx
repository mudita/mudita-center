/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import TextEditor, {
  messages,
  SaveStatus,
  TextEditorProps,
} from "App/__deprecated__/renderer/components/core/text-editor/text-editor.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { fireEvent } from "@testing-library/react"

const text = `Lorem ipsum.\nDolor sit amet`

const renderTextEditor = ({
  temporaryText = text,
  keepTemporaryText = noop,
  onChangesReject = noop,
  onChangesSave = noop,
  status = {
    autosave: undefined,
    save: undefined,
    editMode: false,
  },
  ...props
}: Partial<TextEditorProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <TextEditor
      temporaryText={temporaryText}
      keepTemporaryText={keepTemporaryText}
      onChangesReject={onChangesReject}
      onChangesSave={onChangesSave}
      status={status}
      {...props}
      statsInfo={`${temporaryText.length} characters`}
    />
  )
  return {
    ...outcome,
    getTextarea: () => outcome.getByRole("textbox"),
  }
}

test("renders preview mode properly", () => {
  const { getByTestId, getTextarea, queryByTestId } = renderTextEditor()

  expect(getByTestId("status")).toHaveTextContent(
    intl.formatMessage(messages.clickToEdit)
  )
  expect(getTextarea()).toHaveValue(text)
  expect(getByTestId("stats-info")).toHaveTextContent(text.length.toString())
  expect(queryByTestId("reject")).not.toBeInTheDocument()
  expect(queryByTestId("save")).not.toBeInTheDocument()
})

test("renders edit mode properly", () => {
  const { getByTestId } = renderTextEditor({ status: { editMode: true } })

  expect(getByTestId("status")).toHaveTextContent(
    intl.formatMessage(messages.editMode)
  )
  expect(getByTestId("reject")).toBeDisabled()
  expect(getByTestId("save")).toBeDisabled()
})

test("renders edit mode with changed text properly", () => {
  const { getByTestId } = renderTextEditor({
    status: {
      editMode: true,
      textChanged: true,
    },
  })
  expect(getByTestId("reject")).toBeEnabled()
  expect(getByTestId("save")).toBeEnabled()
})

test("renders edit mode with autosaving changes properly", () => {
  const { getByTestId } = renderTextEditor({
    status: {
      editMode: true,
      textChanged: true,
      autosave: SaveStatus.Saving,
    },
  })
  expect(getByTestId("status")).toHaveTextContent(
    intl.formatMessage(messages.autoSaving)
  )
})

test("renders edit mode with autosaved changes properly", () => {
  const { getByTestId } = renderTextEditor({
    status: {
      editMode: true,
      textChanged: true,
      autosave: SaveStatus.Saved,
    },
  })
  expect(getByTestId("status")).toHaveTextContent(
    intl.formatMessage(messages.autoSaved)
  )
})

test("renders edit mode with saving changes properly", () => {
  const { getByTestId } = renderTextEditor({
    status: {
      editMode: true,
      textChanged: true,
      save: SaveStatus.Saving,
    },
  })
  expect(getByTestId("reject")).toBeDisabled()
  expect(getByTestId("save")).toHaveStyleRule("pointer-events", "none")
  expect(getByTestId("save")).toHaveTextContent(
    intl.formatMessage(messages.savingButton)
  )
})

test("save and reject buttons calls given functions properly", () => {
  const save = jest.fn()
  const reject = jest.fn()

  const { getByTestId } = renderTextEditor({
    status: {
      editMode: true,
      textChanged: true,
    },
    onChangesSave: save,
    onChangesReject: reject,
  })

  fireEvent.click(getByTestId("save"))
  expect(save).toBeCalled()
  fireEvent.click(getByTestId("reject"))
  expect(reject).toBeCalled()
})
