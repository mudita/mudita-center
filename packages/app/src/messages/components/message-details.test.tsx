/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageDetails from "App/messages/components/message-details.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import { Thread } from "App/messages/store/messages.interface"
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
const unknownCallerThread: Thread = {
  id: "1231",
  caller: unknownCaller,
  unread: true,
  messages: [
    {
      author: unknownCaller,
      id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
      date: new Date("2019-10-18T11:27:15.256Z"),
      content:
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      interlocutor: true,
    },
    {
      author: unknownCaller,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: new Date("2019-10-18T11:45:35.112Z"),
      content:
        "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
      interlocutor: true,
    },
  ],
}

const thread: Thread = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  unread: true,
  caller,
  messages: [
    {
      author: caller,
      id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
      date: new Date("2019-10-18T11:27:15.256Z"),
      content:
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      interlocutor: true,
    },
    {
      author: caller,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: new Date("2019-10-18T11:45:35.112Z"),
      content:
        "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",

      interlocutor: true,
    },
  ],
}
const defaultProps = {
  onDeleteClick: jest.fn(),
  onUnreadStatus: jest.fn(),
  onContactClick: jest.fn(),
  onAttachContactClick: jest.fn(),
  details: thread,
}

const contactWithMutlitpleNumbers: Caller = {
  id: "123",
  firstName: "Johny",
  lastName: "",
  phoneNumber: "1123",
  secondaryPhoneNumber: "345345",
}

const mockedThreadFromSecondNumber: Thread = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  caller: {
    id: "123",
    firstName: "Ivan",
    lastName: "",
    phoneNumber: "345345",
    secondaryPhoneNumber: "345345",
  },
  unread: true,
  messages: [
    {
      author: contactWithMutlitpleNumbers,
      id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
      date: new Date("2019-10-18T11:27:15.256Z"),
      content:
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      interlocutor: true,
    },
    {
      author: contactWithMutlitpleNumbers,
      id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
      date: new Date("2019-10-18T11:45:35.112Z"),
      content:
        "Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis. Dolore esse occaecat ipsum officia ad laborum excepteur quis.",

      interlocutor: true,
    },
  ],
}
const multipleContactsProps = {
  onDeleteClick: jest.fn(),
  onUnreadStatus: jest.fn(),
  onContactClick: jest.fn(),
  onAttachContactClick: jest.fn(),
  details: mockedThreadFromSecondNumber,
}

test("sidebar close button informs parent about closing", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} onClose={onClose} />
  )
  fireEvent.click(getByTestId("sidebar-close"))
  expect(onClose).toBeCalled()
})

test("left part of sidebar displays details correctly", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    `${thread.caller.firstName} ${thread.caller.lastName}`
  )
  expect(getByTestId("sidebar-phone-number")).toHaveTextContent(
    thread.caller.phoneNumber
  )
})

test("correct amount of message bubbles is displayed", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  expect(getAllByTestId("message-content")).toHaveLength(thread.messages.length)
})

test("message from unknown person displays only phone number", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} details={unknownCallerThread} />
  )
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    unknownCallerThread.caller.phoneNumber
  )
})

test("mark massage as unread", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} onClose={onClose} />
  )
  fireEvent.click(getByTestId("icon-BorderCheckIcon"))
  expect(defaultProps.onUnreadStatus).toBeCalledWith([thread.id])
  expect(onClose).toBeCalled()
})

test("open contacts", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  fireEvent.click(getByTestId("icon-Contact"))
  expect(defaultProps.onContactClick).toBeCalled()
})

test("delete messages", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  fireEvent.click(getAllByTestId("icon-Delete")[0])
  expect(defaultProps.onDeleteClick).toBeCalledWith(thread.id)
})

test("show info about contact with multiple numbers", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageDetails {...defaultProps} />
  )
  expect(getByTestId("multiple-number")).toBeInTheDocument()
})

test("show info about second number", () => {
  const { getByText } = renderWithThemeAndIntl(
    <MessageDetails {...multipleContactsProps} />
  )
  expect(getByText("#2")).toBeInTheDocument()
})
