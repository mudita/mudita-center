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
