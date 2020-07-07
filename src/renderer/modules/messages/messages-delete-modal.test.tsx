import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessagesDeleteModal from "Renderer/modules/messages/messages-delete-modal.component"
import { mockedTopics } from "App/__mocks__/mocked-topics"
import { Topic } from "Renderer/models/messages/messages.interface"
import { uniqBy } from "lodash"

const defaultProps = {
  deleting: false,
  onDelete: jest.fn(),
  uniqueSelectedRows: (mockedTopics as unknown) as Topic[],
  selectedConversationsIdsCount: 1,
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
    uniqueSelectedRows: uniqBy([mockedTopics[0], mockedTopics[0]], "id"),
  })
  expect(
    getByText("view.name.messages.deleteModal.uniqueText", { exact: false })
  ).toBeInTheDocument()
})
