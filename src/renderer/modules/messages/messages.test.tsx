import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Messages from "./messages.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent } from "@testing-library/dom"
import { mockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"

test("sidebar is hidden by default", () => {
  Element.prototype.scrollIntoView = jest.fn()
  const { queryByTestId } = renderWithThemeAndIntl(
    <Messages searchValue={""} list={mockedList} />
  )
  mockAllIsIntersecting(true)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})

test("clicked row display sidebar", () => {
  Element.prototype.scrollIntoView = jest.fn()
  const { getAllByTestId, getByTestId } = renderWithThemeAndIntl(
    <Messages searchValue={""} list={mockedList} />
  )
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  expect(getByTestId("sidebar")).toBeInTheDocument()
})

test("sidebar closes after clicking close button", () => {
  Element.prototype.scrollIntoView = jest.fn()
  const { getAllByTestId, getByTestId, queryByTestId } = renderWithThemeAndIntl(
    <Messages searchValue={""} list={mockedList} />
  )
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  const closeButton = getByTestId("sidebar-close")
  fireEvent.click(closeButton)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})
