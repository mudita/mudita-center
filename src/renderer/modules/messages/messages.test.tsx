import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { Provider } from "react-redux"
import Messages from "./messages.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent } from "@testing-library/dom"
import { mockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"
import store from "Renderer/store"
import { intl } from "Renderer/utils/intl"
import { MessagePanelTestIds } from "Renderer/modules/messages/messages-panel-test-ids.enum"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const renderer = () => {
  return renderWithThemeAndIntl(
    <Provider store={store}>
      <Messages searchValue={""} list={mockedList} />
    </Provider>
  )
}

test("sidebar is hidden by default", () => {
  const { queryByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})

test("clicked row display sidebar", () => {
  const { getAllByTestId, getByTestId } = renderer()
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  expect(getByTestId("sidebar")).toBeInTheDocument()
})

test("sidebar closes after clicking close button", () => {
  const { getAllByTestId, getByTestId, queryByTestId } = renderer()
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  const closeButton = getByTestId("sidebar-close")
  fireEvent.click(closeButton)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})

test("when at least one checkbox is checked, all checkboxes are visible", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  const checkboxes = getAllByTestId("checkbox")
  checkboxes.forEach((checkbox) => expect(checkbox).not.toBeVisible())
  fireEvent.click(checkboxes[0])
  checkboxes.forEach((checkbox) => expect(checkbox).toBeVisible())
})

test("dropdown call button has correct content", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-call")[0]).toHaveTextContent(
    intl.formatMessage(
      {
        id: "component.dropdown.call",
      },
      { name: mockedList[0].caller.firstName }
    )
  )
})

test("displays correct amount of dropdown call buttons", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-call")).toHaveLength(mockedList.length)
})

test("dropdown contact details button has correct content", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-contact-details")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.messages.dropdownContactDetails",
    })
  )
})

test("displays correct amount of dropdown contact details buttons for contacts", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-contact-details")).toHaveLength(2)
})

test("displays correct amount of dropdown add to contacts buttons for person that is unknown", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-add-to-contacts")).toHaveLength(1)
})

test("dropdown mark as read button has correct content ", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-mark-as-read")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.messages.markAsRead",
    })
  )
})

test("displays correct amount of dropdown mark as read buttons", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-mark-as-read")).toHaveLength(
    mockedList.length
  )
})

test("dropdown delete button has correct content", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-delete")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.messages.dropdownDelete",
    })
  )
})

test("displays correct amount of dropdown delete buttons", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-delete")).toHaveLength(mockedList.length)
})

test("when at least one checkbox is checked, selection manager is displayed", () => {
  const { getAllByTestId, getByTestId } = renderer()
  mockAllIsIntersecting(true)
  const checkboxes = getAllByTestId("checkbox")
  fireEvent.click(checkboxes[0])
  expect(getByTestId(MessagePanelTestIds.SelectionManager)).toBeInTheDocument()
})
