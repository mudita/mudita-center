/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import { fireEvent } from "@testing-library/dom"
import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ThreadDetails from "App/messages/components/thread-details.component"
import {
  Message,
  MessageType,
  Receiver,
  ReceiverIdentification,
  ResultState,
} from "App/messages/reducers/messages.interface"
import { ThreadDetailsTestIds } from "App/messages/components/thread-details-test-ids.enum"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { TableTestIds } from "Renderer/components/core/table/table.enum"

beforeAll(() => (Element.prototype.scrollIntoView = jest.fn()))

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
  resultState: ResultState.Loaded,
  onCheckClick: jest.fn(),
  onContentChange: jest.fn(),
  onLoadMessagesClick: jest.fn(),
  onSendClick: jest.fn(),
  onClose: jest.fn(),
  onDeleteClick: jest.fn(),
  onContactClick: jest.fn(),
  onAttachContactClick: jest.fn(),
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

test("Error text renders with retry button when thread won't load", () => {
  const { getByTestId } = renderer({
    resultState: ResultState.Error,
  })

  expect(getByTestId(ThreadDetailsTestIds.ErrorText)).toBeInTheDocument()
  expect(getByTestId(ThreadDetailsTestIds.RetryButton)).toBeInTheDocument()
})

// TODO: Add loading state as part of pagination task CP-741
test.skip("Loader renders when thread is loading", () => {
  const { getByTestId } = renderer({
    resultState: ResultState.Loading,
  })
  expect(getByTestId(ThreadDetailsTestIds.Loader)).toBeInTheDocument()
})

test("Retry button tries to load thread again after initial call", () => {
  const onLoadMessagesClick = jest.fn()
  const { getByTestId } = renderer({
    resultState: ResultState.Error,
    onLoadMessagesClick,
  })
  getByTestId(ThreadDetailsTestIds.RetryButton).click()
  expect(onLoadMessagesClick).toBeCalled()
})
