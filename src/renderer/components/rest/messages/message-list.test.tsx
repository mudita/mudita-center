import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessagesList from "Renderer/components/rest/messages/messages-list.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"

const testList = [
  {
    id: "1231",
    caller: {
      id: "123",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123",
    },
    unread: true,
    messages: [
      {
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
  {
    id: "1233",
    caller: {
      id: "123",
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: "321",
    },
    unread: false,
    messages: [
      {
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
  {
    id: "1234",
    caller: {
      id: "123",
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: "321",
    },
    unread: false,
    messages: [
      {
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      },
      {
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      },
    ],
  },
]

test("when at least one checkbox is checked, all checkboxes are visible", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessagesList list={testList} />
  )
  mockAllIsIntersecting(true)
  const checkboxes = getAllByTestId("checkbox")
  checkboxes.forEach(checkbox => expect(checkbox).not.toBeVisible())
  fireEvent.click(checkboxes[0])
  checkboxes.forEach(checkbox => expect(checkbox).toBeVisible())
})
