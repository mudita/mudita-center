/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import MessageDayBubble from "App/messages/components/message-day-bubble.component"
import { MessageDayBubbleTestIds } from "App/messages/components/message-day-bubble-test-ids"
import { AvatarTestIds } from "App/__deprecated__/renderer/components/core/avatar/avatar-test-ids.enum"
import { MessageType } from "App/messages/constants"

type Properties = ComponentProps<typeof MessageDayBubble>

const defaultProps: Properties = {
  user: {
    firstName: "",
    lastName: "Mosciski",
  },
  interlocutor: true,
  displayAvatar: true,
  message: "Molestiae molestias voluptate rerum. Dolores possimus id.",
  id: "c7873064-ee7c-49ae-a1c0-bd2d73f401ib",
  displayDate: false,
  date: new Date("2021-02-13T22:22:13.615Z"),
  messageType: MessageType.OUTBOX,
  isMessageBeingDeleted: false,
  removeMessage: jest.fn(),
  selected: false,
  searchQuery: "",
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
const renderer = (extraProps?: {}) => {
  const props: Properties = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<MessageDayBubble {...props} />)

  return {
    ...outcome,
  }
}

test("date tag isn't visible if displayDate flag is set to true", () => {
  const { queryByTestId } = renderer({ displayDate: true })
  const dateTagElement = queryByTestId(MessageDayBubbleTestIds.Date)
  expect(dateTagElement).not.toBeInTheDocument()
})

test("date tag is visible if displayDate flag is set to false", () => {
  const { queryByTestId } = renderer({ displayDate: false })
  const dateTagElement = queryByTestId(MessageDayBubbleTestIds.Date)
  expect(dateTagElement).toBeInTheDocument()
  expect(dateTagElement).toBeVisible()
})

test("avatar is visible if displayDate flag is set to false", () => {
  const { queryByTestId } = renderer({ displayDate: false })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).toBeInTheDocument()
  expect(textAvatarElement).toBeVisible()
})

test("avatar is visible if displayDate flag is set to true and displayAvatar false", () => {
  const { queryByTestId } = renderer({
    displayDate: false,
    displayAvatar: false,
  })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).toBeInTheDocument()
  expect(textAvatarElement).toBeVisible()
})

test("avatar is visible if displayDate flag is set to true and displayAvatar true", () => {
  const { queryByTestId } = renderer({
    displayDate: false,
    displayAvatar: true,
  })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).toBeVisible()
})

test("avatar isn't visible if displayDate flag is set to true and displayAvatar false", () => {
  const { queryByTestId } = renderer({
    displayDate: true,
    displayAvatar: false,
  })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).not.toBeInTheDocument()
})
