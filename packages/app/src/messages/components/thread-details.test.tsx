/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import { fireEvent } from "@testing-library/dom"
import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import ThreadDetails from "App/messages/components/thread-details.component"
import {
  Receiver,
  ReceiverIdentification,
} from "App/messages/reducers/messages.interface"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { TableTestIds } from "App/__deprecated__/renderer/components/core/table/table.enum"
import { Message } from "App/messages/dto"
import { MessageType } from "App/messages/constants"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

const phoneNumber = "123 456 789"
const firstThreadId = "1"

const receiver: Receiver = {
  phoneNumber,
  firstName: "John",
  lastName: "Doe",
  identification: ReceiverIdentification.unknown,
}

const unknownReceiver: Receiver = {
  firstName: "",
  lastName: "",
  phoneNumber: "+123 456 123",
  identification: ReceiverIdentification.unknown,
}

const messages: Message[] = [
  {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: firstThreadId,
    phoneNumber: receiver.phoneNumber,
    messageType: MessageType.INBOX,
  },
  {
    id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
    date: new Date("2019-10-18T11:45:35.112Z"),
    content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
    threadId: firstThreadId,
    phoneNumber: receiver.phoneNumber,
    messageType: MessageType.OUTBOX,
  },
]

type Props = ComponentProps<typeof ThreadDetails>

const defaultProps: Props = {
  receiver,
  messages: messages,
  content: "",
  contactCreated: false,
  onCheckClick: jest.fn(),
  onContentChange: jest.fn(),
  onSendClick: jest.fn(),
  onClose: jest.fn(),
  onDeleteClick: jest.fn(),
  onContactClick: jest.fn(),
  onAttachContactClick: jest.fn(),
  messageLayoutNotifications: [],
  removeLayoutNotification: jest.fn(),
  onMessageRead: jest.fn(),
  currentlyDeletingMessageId: null,
  onMessageDelete: jest.fn(),
}

const renderer = (extraProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<ThreadDetails {...props} />)

  return {
    ...outcome,
  }
}

test("Sidebar close button informs parent about closing", () => {
  const onClose = jest.fn()
  const { getByTestId } = renderer({ onClose })
  fireEvent.click(getByTestId(TableTestIds.SidebarClose))
  expect(onClose).toBeCalled()
})

test("Left part of sidebar displays details correctly", () => {
  const { getByTestId } = renderer()
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    `${createFullName(receiver)}`
  )
  expect(getByTestId("sidebar-phone-number")).toHaveTextContent(
    receiver.phoneNumber
  )
})

test("Message from unknown person displays only phone number", () => {
  const { getByTestId } = renderer({
    receiver: unknownReceiver,
  })
  expect(getByTestId("sidebar-fullname")).toHaveTextContent(
    unknownReceiver.phoneNumber
  )
})

test("Open contacts", () => {
  const { getByTestId } = renderer()
  fireEvent.click(getByTestId("icon-NewContact"))
  expect(defaultProps.onContactClick).toBeCalled()
})

test("Delete messages", () => {
  const { getAllByTestId } = renderer()
  fireEvent.click(getAllByTestId("icon-Delete")[0])
  expect(defaultProps.onDeleteClick).toBeCalled()
})

test("Show info about contact with multiple numbers", () => {
  const { getByTestId, getByText } = renderer({
    receiver: { ...receiver, identification: ReceiverIdentification.secondary },
  })
  expect(getByTestId("multiple-number")).toBeInTheDocument()
  expect(getByText("#2")).toBeInTheDocument()
})
