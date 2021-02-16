/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { Provider } from "react-redux"
import Messages from "./messages-ui.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent } from "@testing-library/dom"
import store from "Renderer/store"
import { intl } from "Renderer/utils/intl"
import { MessagePanelTestIds } from "App/messages/components/messages-panel-test-ids.enum"
import { Router } from "react-router"
import { createMemoryHistory } from "history"
import { Topic } from "App/messages/store/messages.interface"
import { createFakeCaller } from "App/messages/helpers/create-fake-caller"
import { Caller } from "Renderer/models/calls/calls.interface"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const caller = createFakeCaller()

const unknownCaller: Caller = {
  id: "11",
  firstName: "",
  lastName: "",
  phoneNumber: "+123 456 123",
}

export const topics: Topic[] = [
  {
    id: "1231",
    caller,
    unread: true,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
  {
    id: "1233",
    caller: unknownCaller,
    unread: false,
    messages: [
      {
        author: unknownCaller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: unknownCaller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
  {
    id: "1234",
    caller,
    unread: false,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: new Date("2019-10-18T11:27:15.256Z"),
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: new Date("2019-10-18T11:45:35.112Z"),
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
]

const renderer = () => {
  const history = createMemoryHistory()
  return renderWithThemeAndIntl(
    <Router history={history}>
      <Provider store={store}>
        <Messages
          language={"en"}
          searchValue={""}
          list={topics}
          attachContactList={[]}
          attachContactFlatList={[]}
        />
      </Provider>
    </Router>
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
      { name: topics[0].caller.firstName }
    )
  )
})

test("displays correct amount of dropdown call buttons", () => {
  const { getAllByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getAllByTestId("dropdown-call")).toHaveLength(topics.length)
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
  const { getByTestId } = renderer()
  mockAllIsIntersecting(true)
  expect(getByTestId("dropdown-add-to-contacts")).toBeInTheDocument()
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
  expect(getAllByTestId("dropdown-mark-as-read")).toHaveLength(topics.length)
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
  expect(getAllByTestId("dropdown-delete")).toHaveLength(topics.length)
})

test("when at least one checkbox is checked, selection manager is displayed", () => {
  const { getAllByTestId, getByTestId } = renderer()
  mockAllIsIntersecting(true)
  const checkboxes = getAllByTestId("checkbox")
  fireEvent.click(checkboxes[0])
  expect(getByTestId(MessagePanelTestIds.SelectionManager)).toBeInTheDocument()
})
