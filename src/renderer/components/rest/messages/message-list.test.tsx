import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessagesList from "Renderer/components/rest/messages/messages-list.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { intl } from "Renderer/utils/intl"
import { mockedList } from "./__mocks__/caller-data"

test("when at least one checkbox is checked, all checkboxes are visible", () => {
  Element.prototype.scrollIntoView = jest.fn()
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  const checkboxes = getAllByTestId("checkbox")
  checkboxes.forEach(checkbox => expect(checkbox).not.toBeVisible())
  fireEvent.click(checkboxes[0])
  checkboxes.forEach(checkbox => expect(checkbox).toBeVisible())
})

test("dropdown call button has correct content", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-call")[0]).toHaveTextContent(
    intl.formatMessage(
      {
        id: "view.name.messages.dropdownCall",
      },
      { name: mockedList[0].caller.firstName }
    )
  )
})

test("displays correct amount of dropdown call buttons", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-call")).toHaveLength(3)
})

test("dropdown contact details button has correct content ", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-contact-details")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.messages.dropdownContactDetails",
    })
  )
})

test("displays correct amount of dropdown contact details buttons", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-contact-details")).toHaveLength(3)
})

test("dropdown mark as read button has correct content ", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-mark-as-read")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.messages.dropdownMarkAsRead",
    })
  )
})

test("displays correct amount of dropdown mark as read buttons", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-mark-as-read")).toHaveLength(3)
})

test("dropdown delete button has correct content", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-delete")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.messages.dropdownDelete",
    })
  )
})

test("displays correct amount of dropdown delete buttons", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-delete")).toHaveLength(3)
})
