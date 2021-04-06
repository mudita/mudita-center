/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageBubble from "App/messages/components/message-bubble.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom"

const user = { firstName: "user", lastName: "userowski", id: "0" }
const date = new Date()
const emptyUser = { firstName: "", lastName: "", id: "" }
const id = "123"
const message =
  "2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae"

test("by default dropdown is not visible", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageBubble user={user} date={date} message={message} id={id} />
  )
  expect(getByTestId("dropdown")).not.toBeVisible()
})

test("after clicking button, dropdown is displayed", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageBubble user={user} date={date} message={message} id={id} />
  )
  fireEvent.click(getByTestId("dropdown-action-button"))
  expect(getByTestId("dropdown")).toBeVisible()
})

test("forwards message", () => {
  const forwardMessage = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageBubble
      user={user}
      date={date}
      message={message}
      forwardMessage={forwardMessage}
      id={id}
    />
  )
  fireEvent.click(getByTestId("forward-message"))
  expect(forwardMessage).toHaveBeenCalled()
  expect(forwardMessage).toHaveBeenCalledWith(id)
})

test("removes message", () => {
  const removeMessage = jest.fn()
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageBubble
      user={user}
      date={date}
      message={message}
      removeMessage={removeMessage}
      id={id}
    />
  )
  fireEvent.click(getByTestId("delete-message"))
  expect(removeMessage).toHaveBeenCalledWith(id)
})

test("when author of message is unknown, displays default icon in avatar", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageBubble
      user={emptyUser}
      date={date}
      message={message}
      id={id}
      displayAvatar
    />
  )
  expect(getByTestId("icon-Contact")).toBeInTheDocument()
})
