import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Messages from "./messages.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { fireEvent } from "@testing-library/dom"

const caller = {
  id: "59198364-5ba4-4e4b-8802-330db16911b5",
  firstName: "Lance",
  lastName: "Goyette",
  phoneNumber: "+93 832 460 374",
}

const list = [
  {
    id: "4e429cff-c6ed-4f46-92e6-e8ff446071bc",
    caller,
    unread: true,
    messages: [
      {
        author: caller,
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content: [
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        ],
        interlocutor: true,
      },
      {
        author: caller,
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content: [
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
        ],
        interlocutor: true,
      },
    ],
  },
]

test("sidebar is hidden by default", () => {
  const { queryByTestId } = renderWithThemeAndIntl(
    <Messages searchValue={""} list={list} />
  )
  mockAllIsIntersecting(true)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})

test("clicked row display sidebar", () => {
  const { getAllByTestId, getByTestId } = renderWithThemeAndIntl(
    <Messages searchValue={""} list={list} />
  )
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  expect(getByTestId("sidebar")).toBeInTheDocument()
})

test("sidebar closes after clicking close button", () => {
  const { getAllByTestId, getByTestId, queryByTestId } = renderWithThemeAndIntl(
    <Messages searchValue={""} list={list} />
  )
  mockAllIsIntersecting(true)
  const tableRow = getAllByTestId("message-row")[0]
  fireEvent.click(tableRow)
  const closeButton = getByTestId("sidebar-close")
  fireEvent.click(closeButton)
  expect(queryByTestId("sidebar")).not.toBeInTheDocument()
})
