import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessagesDeleteModal from "Renderer/modules/messages/messages-delete-modal.component"
import { mockedContacts } from "App/__mocks__/mocked-contacts"

const defaultProps = {
  deleting: false,
  onDelete: jest.fn(),
  uniqueSelectedRows: new Set(mockedContacts),
  selectedConversationsIdsNumber: 1,
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<MessagesDeleteModal {...props} />)
}

test("modal can perform delete action", () => {
  const { getByText } = renderer()
  const deleteButton = getByText(
    "view.name.phone.contacts.modal.delete.deleteButton",
    { exact: false }
  )
  deleteButton.click()
  expect(defaultProps.onDelete).toBeCalled()
})

test("correct text is displayed when there is more than 1 unique conversation", () => {
  const { getByText } = renderer()
  expect(
    getByText("view.name.messages.deleteModal.text", { exact: false })
  ).toBeInTheDocument()
})

test("correct text is displayed when there is 1 unique conversation", () => {
  const { getByText } = renderer({
    uniqueSelectedRows: new Set([mockedContacts[0]]),
  })
  expect(
    getByText("view.name.messages.deleteModal.uniqueText", { exact: false })
  ).toBeInTheDocument()
})

test("correct text is displayed when there is 2 conversations with one user", () => {
  const { getByText } = renderer({
    uniqueSelectedRows: new Set([mockedContacts[0], mockedContacts[0]]),
  })
  expect(
    getByText("view.name.messages.deleteModal.uniqueText", { exact: false })
  ).toBeInTheDocument()
})
