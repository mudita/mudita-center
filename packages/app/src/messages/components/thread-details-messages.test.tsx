/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { Message, MessageType } from "App/messages/store/messages.interface"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import ThreadDetailsMessages from "App/messages/components/thread-details-messages.component"
import { Contact } from "App/contacts/store/contacts.type"
import { MessageBubbleTestIds } from "App/messages/components/message-bubble-test-ids.enum"
import { AvatarTestIds } from "Renderer/components/core/avatar/avatar-test-ids.enum"

window.HTMLElement.prototype.scrollIntoView = jest.fn()

type Properties = ComponentProps<typeof ThreadDetailsMessages>

const contact: Contact = {
  id: "274970a2-13b7-4f42-962d-8fa0b2b48377",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "123 456 789",
  email: "example@mudita.com",
  note: "",
  firstAddressLine: "",
}

const messages: Message[] = [
  {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: contact.secondaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.INBOX,
  },
  {
    id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
    date: new Date("2019-10-18T11:45:35.112Z"),
    content: "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
    threadId: contact.secondaryPhoneNumber!,
    contactId: contact.id,
    messageType: MessageType.OUTBOX,
  },
]

const defaultProps: Properties = {
  contact,
  messages,
}

const renderer = (extraProps?: {}) => {
  const props: Properties = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<ThreadDetailsMessages {...props} />)

  return {
    ...outcome,
  }
}

test("correct amount of message bubbles is displayed", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(MessageBubbleTestIds.MessageContent)).toHaveLength(
    messages.length
  )
})

test("avatar renders in thread details properly", () => {
  const { getAllByTestId } = renderer()
  const textAvatars = getAllByTestId(AvatarTestIds.AvatarText)
  const iconAvatars = getAllByTestId("icon-Contact")
  expect(textAvatars).toHaveLength(1)
  expect(iconAvatars).toHaveLength(1)
  expect(textAvatars[0]).toBeVisible()
  expect(iconAvatars[0]).toBeVisible()
  expect(textAvatars[0]).toHaveTextContent("JD")
})
