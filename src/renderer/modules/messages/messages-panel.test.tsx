import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessagesPanel from "Renderer/modules/messages/messages-panel.component"
import { fireEvent } from "@testing-library/dom"
import { MessagePanelTestIds } from "Renderer/modules/messages/messages-panel-test-ids.enum"
import { VisibilityFilter } from "Renderer/models/messages/messages.interface"
import { mockedUnreadMessages } from "App/__mocks__/mocked-unread-messages"

const defaultProps = {
  selectedItemsCount: 0,
  searchValue: "",
  deleteConversation: jest.fn(),
  selectedConversations: [],
  resetRows: jest.fn(),
  onMarkAsRead: jest.fn(),
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<MessagesPanel {...props} />)
}

test("filter buttons are rendered when there are no selected checkboxes", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(MessagePanelTestIds.FilterButtons)).toBeInTheDocument()
})

test("filter buttons are not rendered when there are selected checkboxes", () => {
  const { queryByTestId } = renderer({
    selectedConversations: mockedUnreadMessages,
  })
  expect(
    queryByTestId(MessagePanelTestIds.FilterButtons)
  ).not.toBeInTheDocument()
})

test("when there are selected checkboxes, selection manager is rendered", () => {
  const { getByTestId } = renderer({
    selectedConversations: mockedUnreadMessages,
  })
  expect(getByTestId(MessagePanelTestIds.SelectionManager)).toBeInTheDocument()
})

test("search works", () => {
  const changeSearchValue = jest.fn()
  const { getByRole } = renderer({ changeSearchValue })
  const searchInput = getByRole("searchbox")
  fireEvent.change(searchInput, { target: { value: "G" } })
  expect(changeSearchValue).toBeCalled()
})

test("mark as read button is rendered when filter is set to unread and there is at least one item selected", () => {
  const { getByTestId } = renderer({
    visibilityFilter: VisibilityFilter.Unread,
    selectedConversations: mockedUnreadMessages,
  })
  expect(
    getByTestId(MessagePanelTestIds.SelectionManagerMarkAsReadButton)
  ).toBeInTheDocument()
})

test("click on mark as read button performs correct action", () => {
  const { getByTestId } = renderer({
    visibilityFilter: VisibilityFilter.Unread,
    selectedConversations: mockedUnreadMessages,
  })
  getByTestId(MessagePanelTestIds.SelectionManagerMarkAsReadButton).click()
  expect(defaultProps.onMarkAsRead).toBeCalledWith([
    mockedUnreadMessages[0].id,
    mockedUnreadMessages[1].id,
  ])
})
