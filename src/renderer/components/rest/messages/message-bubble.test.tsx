import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MessageBubble from "Renderer/components/rest/messages/message-bubble.component"
import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom"

const user = { firstName: "user", lastName: "userowski" }

test("by default dropdown is not visible", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageBubble
      user={user}
      content={
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae"
      }
    />
  )
  expect(getByTestId("dropdown")).not.toBeVisible()
})

test("after clicking button, dropdown is displayed", () => {
  const { getByTestId } = renderWithThemeAndIntl(
    <MessageBubble
      user={user}
      content={
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quae"
      }
    />
  )
  fireEvent.click(getByTestId("dropdown-action-button"))
  expect(getByTestId("dropdown")).toBeVisible()
})
