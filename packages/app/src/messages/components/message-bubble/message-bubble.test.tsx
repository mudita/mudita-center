/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import { MessageBubble } from "App/messages/components/message-bubble/message-bubble.component"
import { MessageBubbleTestIds } from "App/messages/components/message-bubble/message-bubble-test-ids.enum"
import { MessageType } from "App/messages/constants"

type Props = ComponentProps<typeof MessageBubble>

const emptyUser = { firstName: "", lastName: "", id: "" }
const defaultProps: Props = {
  user: { firstName: "user", lastName: "userowski" },
  date: new Date(),
  id: "123",
  message:
    "2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae",
  messageType: MessageType.INBOX,
}

const renderer = (extraProps?: {}) => {
  const props: Props = {
    ...defaultProps,
    ...extraProps,
  }

  const outcome = renderWithThemeAndIntl(<MessageBubble {...props} />)

  return {
    ...outcome,
  }
}

test("by default dropdown is not visible", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(MessageBubbleTestIds.Dropdown)).not.toBeVisible()
})

test("after clicking button, dropdown is displayed", () => {
  const { getByTestId } = renderer()
  fireEvent.click(getByTestId(MessageBubbleTestIds.DropdownActionButton))
  expect(getByTestId(MessageBubbleTestIds.Dropdown)).toBeVisible()
})

test("forwards message", () => {
  const forwardMessage = jest.fn()
  const { getByTestId } = renderer({ forwardMessage })
  fireEvent.click(getByTestId(MessageBubbleTestIds.ForwardMessageButton))
  expect(forwardMessage).toHaveBeenCalled()
  expect(forwardMessage).toHaveBeenCalledWith(defaultProps.id)
})

test("removes message", () => {
  const removeMessage = jest.fn()
  const { getByTestId } = renderer({ removeMessage })
  fireEvent.click(getByTestId(MessageBubbleTestIds.DeleteMessageButton))
  expect(removeMessage).toHaveBeenCalledWith(defaultProps.id)
})

test("when author of message is unknown, displays default icon in avatar", () => {
  const { getByTestId } = renderer({
    displayAvatar: true,
    interlocutor: true,
    user: emptyUser,
  })
  expect(getByTestId("icon-ContactFilled")).toBeInTheDocument()
})

describe("Message Bubble Container", () => {
  test("should has flex-direction set to row-reverse when interlocutor is true", () => {
    const { getByTestId } = renderer({ interlocutor: true })
    const container = getByTestId(MessageBubbleTestIds.Container)
    expect(container).toHaveStyle("flex-direction: row-reverse")
  })
  test("should has flex-direction set to row when interlocutor is false", () => {
    const { getByTestId } = renderer({ interlocutor: false })
    const container = getByTestId(MessageBubbleTestIds.Container)
    expect(container).toHaveStyle("flex-direction: row")
  })
})

test("should show not send status if sending message failed", () => {
  const { getByTestId } = renderer({ messageType: MessageType.FAILED })
  expect(getByTestId(MessageBubbleTestIds.NotSendIcon)).toBeInTheDocument()
})
