/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessagesPanel from "App/messages/components/messages-panel.component"
import { fireEvent } from "@testing-library/dom"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { Thread, VisibilityFilter } from "App/messages/store/messages.interface"

const mockedUnreadThreads: Thread[] = [
  {
    id: "1",
    number: "+03026752736",
    contactId: "a62a36da-7203-4ba4-a14a-51e4a3d617be",
    lastUpdatedAt: new Date("2019-08-07T13:29:51.401Z"),
    messageSnippet:
      "Sunt autem sed ut aut aspernatur totam modi qui. Atque tenetur est ex totam repudiandae voluptatibus tempora sed.",
    unread: true,
  },
  {
    id: "2",
    number: "+03026752716",
    contactId: "11a62a36da-7203-4ba4-a14a-51e4a3d617be",
    lastUpdatedAt: new Date("2019-08-07T13:29:51.401Z"),
    messageSnippet:
      "Sunt autem sed ut aut aspernatur totam modi qui. Atque tenetur est ex totam repudiandae voluptatibus tempora sed.",
    unread: true,
  },
]

const defaultProps = {
  selectedItemsCount: 0,
  searchValue: "",
  deleteThreads: jest.fn(),
  selectedConversations: [],
  resetRows: jest.fn(),
  onMarkAsRead: jest.fn(),
  onDeleteClick: jest.fn(),
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
    selectedConversations: mockedUnreadThreads,
  })
  expect(
    queryByTestId(MessagePanelTestIds.FilterButtons)
  ).not.toBeInTheDocument()
})

test("when there are selected checkboxes, selection manager is rendered", () => {
  const { getByTestId } = renderer({
    selectedConversations: mockedUnreadThreads,
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
    selectedConversations: mockedUnreadThreads,
  })
  expect(
    getByTestId(MessagePanelTestIds.SelectionManagerMarkAsReadButton)
  ).toBeInTheDocument()
})

test("click on mark as read button performs correct action", () => {
  const { getByTestId } = renderer({
    visibilityFilter: VisibilityFilter.Unread,
    selectedConversations: mockedUnreadThreads,
  })
  getByTestId(MessagePanelTestIds.SelectionManagerMarkAsReadButton).click()
  expect(defaultProps.onMarkAsRead).toBeCalledWith([
    mockedUnreadThreads[0].id,
    mockedUnreadThreads[1].id,
  ])
})
