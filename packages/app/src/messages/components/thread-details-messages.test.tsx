/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Message, MessageType, Receiver, ReceiverIdentification } from "App/messages/store/messages.interface"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import { MessageBubbleTestIds } from "App/messages/components/message-bubble-test-ids.enum"
import { AvatarTestIds } from "Renderer/components/core/avatar/avatar-test-ids.enum"
import { MessageDayBubbleTestIds } from "App/messages/components/message-day-bubble-test-ids"

window.HTMLElement.prototype.scrollIntoView = jest.fn()

type Props = ComponentProps<typeof ThreadDetailsMessages>

const receiver: Receiver = {
  contactId: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "123 456 788",
  identification: ReceiverIdentification.unknown
}

const threadId = "1"

const messages: Message[] = [
  {
    threadId,
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date(),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    phoneNumber: receiver.phoneNumber,
    contactId: receiver.contactId,
    messageType: MessageType.INBOX,
  },
  {
    threadId,
    id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
    date: new Date("2019-10-18T11:45:35.112Z"),
    content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
    phoneNumber: receiver.phoneNumber,
    contactId: receiver.contactId,
    messageType: MessageType.OUTBOX,
  },
]

const defaultProps: Props = {
  receiver,
  messages,
}

const renderer = (extraProps?: {}) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<ThreadDetailsMessages {...props} />)

  return {
    ...outcome,
  }
}

test("Correct amount of message bubbles is displayed", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(MessageBubbleTestIds.MessageContent)).toHaveLength(
    messages.length
  )
})

test("Avatar renders in thread details properly", () => {
  const { getByTestId } = renderer()
  const textAvatar = getByTestId(AvatarTestIds.AvatarText)
  const iconAvatar = getByTestId("icon-ContactFilled")
  expect(textAvatar).toBeInTheDocument()
  expect(iconAvatar).toBeInTheDocument()
  expect(textAvatar).toBeVisible()
  expect(iconAvatar).toBeVisible()
  expect(textAvatar).toHaveTextContent("JD")
})

test("Message date tag is displayed even if message list has only single message", () => {
  const { getByTestId } = renderer({ messages: [messages[0]] })
  const messageDayBubble = getByTestId(MessageDayBubbleTestIds.Date)
  expect(messageDayBubble).toHaveTextContent("[value] component.textToday")
})

describe("Message Bubble Container", () => {
  test("should has flex-direction set to row-reverse when messageType is INBOX", () => {
    const { getByTestId } = renderer({ messages: [messages[0]] })
    const container = getByTestId(MessageBubbleTestIds.Container)
    expect(container).toHaveStyle("flex-direction: row-reverse")
  })
  test("should has flex-direction set to row when messageType is OUTBOX", () => {
    const { getByTestId } = renderer({ messages: [messages[1]] })
    const container = getByTestId(MessageBubbleTestIds.Container)
    expect(container).toHaveStyle("flex-direction: row")
  })
})
