import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { Provider } from "react-redux"
import Messages from "./messages.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent } from "@testing-library/dom"
import { mockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"
import store from "Renderer/store"

test("sidebar is hidden by default", () => {
  const { queryByTestId } = renderWithThemeAndIntl(
    <Provider store={store}>
      <Messages searchValue={""} list={mockedList} />
    </Provider>
  )
  mockAllIsIntersecting(true)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})

test("clicked row display sidebar", () => {
  const { getAllByTestId, getByTestId } = renderWithThemeAndIntl(
    <Provider store={store}>
      <Messages searchValue={""} list={mockedList} />
    </Provider>
  )
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  expect(getByTestId("sidebar")).toBeInTheDocument()
})

test("sidebar closes after clicking close button", () => {
  const { getAllByTestId, getByTestId, queryByTestId } = renderWithThemeAndIntl(
    <Provider store={store}>
      <Messages searchValue={""} list={mockedList} />
    </Provider>
  )
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  const closeButton = getByTestId("sidebar-close")
  fireEvent.click(closeButton)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})
