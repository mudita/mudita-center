import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessagesPanel from "Renderer/modules/messages/messages-panel.component"
import { fireEvent } from "@testing-library/dom"
import { MessagePanelTestIds } from "Renderer/modules/messages/messages-panel-test-ids.enum"

const defaultProps = {
  selectedItemsCount: 0,
  searchValue: "",
  deleteConversation: jest.fn(),
  selectedConversations: [],
  resetRows: jest.fn(),
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
  const { queryByTestId } = renderer({ selectedItemsCount: 1 })
  expect(
    queryByTestId(MessagePanelTestIds.FilterButtons)
  ).not.toBeInTheDocument()
})

test("when there are selected checkboxes, selection manager is rendered", () => {
  const { getByTestId } = renderer({ selectedItemsCount: 1 })
  expect(getByTestId(MessagePanelTestIds.SelectionManager)).toBeInTheDocument()
})

test("search works", () => {
  const changeSearchValue = jest.fn()
  const { getByRole } = renderer({ changeSearchValue })
  const searchInput = getByRole("searchbox")
  fireEvent.change(searchInput, { target: { value: "G" } })
  expect(changeSearchValue).toBeCalled()
})
