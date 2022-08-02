/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageBubbleTestIds } from "App/messages/components/message-bubble/message-bubble-test-ids.enum"
import { MessageDayBubbleTestIds } from "App/messages/components/message-day-bubble-test-ids"
import { NewMessageBadgeTestIds } from "App/messages/components/new-message-badge/new-message-badge-test-ids.enum"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import { MessageType } from "App/messages/constants"
import { Message } from "App/messages/dto"
import {
  Receiver,
  ReceiverIdentification,
} from "App/messages/reducers/messages.interface"
import {
  NotificationMethod,
  NotificationResourceType,
} from "App/notification/constants"
import { AvatarTestIds } from "App/__deprecated__/renderer/components/core/avatar/avatar-test-ids.enum"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React, { ComponentProps } from "react"

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)

jest.mock("react-viewport-list", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children, items }: any) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
    return <>{items.map((item: any, index: any) => children(item, index))}</>
  }
})
window.HTMLElement.prototype.scrollIntoView = jest.fn()

type Props = ComponentProps<typeof ThreadDetailsMessages>

const receiver: Receiver = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "123 456 788",
  identification: ReceiverIdentification.unknown,
}

const threadId = "1"

const outboxMessage = {
  threadId,
  id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
  date: new Date("2019-10-18T11:45:35.112Z"),
  content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
  phoneNumber: receiver.phoneNumber,
  messageType: MessageType.OUTBOX,
}
const inboxMessage = {
  threadId,
  id: "27b7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date(),
  content: "Adipisicing non qui Lorem aliqua officia laboris.",
  phoneNumber: receiver.phoneNumber,
  messageType: MessageType.INBOX,
}

const messages: Message[] = [inboxMessage, outboxMessage]

const messageLayoutNotifications = [
  {
    id: "1234",
    type: NotificationResourceType.Message,
    method: NotificationMethod.Layout,
    resourceType: NotificationResourceType.Message,
    content: inboxMessage,
  },
]

const messageLayoutNotificationsOutbox = [
  {
    id: "1234",
    type: NotificationResourceType.Message,
    method: NotificationMethod.Layout,
    resourceType: NotificationResourceType.Message,
    content: outboxMessage,
  },
]

const defaultProps: Props = {
  receiver,
  messages,
  messageLayoutNotifications: [],
  currentlyDeletingMessageId: null,
  onMessageRemove: noop,
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
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
  test("should show NewMessageBadge if there is new inbox notification", () => {
    const { getByTestId } = renderer({
      messageLayoutNotifications: messageLayoutNotifications,
    })
    expect(getByTestId(NewMessageBadgeTestIds.Wrapper)).toBeInTheDocument()
  })
  test("should not show NewMessageBadge if there is new outbox notification", () => {
    const { queryByTestId } = renderer({
      messageLayoutNotifications: messageLayoutNotificationsOutbox,
    })
    expect(
      queryByTestId(NewMessageBadgeTestIds.Wrapper)
    ).not.toBeInTheDocument()
  })
})
