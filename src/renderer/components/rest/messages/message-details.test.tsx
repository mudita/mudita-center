import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageDetails from "Renderer/components/rest/messages/message-details.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"

const details = {
  caller: {
    id: "1c5cbd07-de9a-4085-a2ec-8c1618157a36",
    firstName: "Norris",
    lastName: "Hammes",
    phoneNumber: "+90 578 340 138",
  },
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
        "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
    },
  ],
}

test("onClose is called when sidebar close button is clicked", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails details={details} onClose={onClose} />
  )
  fireEvent.click(getByTestId("sidebar-close"))
  expect(onClose).toBeCalled()
})

test("left part of sidebar displays details correctly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails details={details} />
  )
  expect(getByTestId("sidebar-fullname")).toHaveTextContent("Norris Hammes")
  expect(getByTestId("sidebar-phone-number")).toHaveTextContent(
    "+90 578 340 138"
  )
})
