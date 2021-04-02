/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import MessageDayBubble from "App/messages/components/message-day-bubble.component"
import { SlackDateTestIds } from "App/messages/components/slack-date-test-ids.enum"
import { AvatarTestIds } from "Renderer/components/core/avatar/avatar-test-ids.enum"

type Properties = ComponentProps<typeof MessageDayBubble>

const defaultProps: Properties = {
  user: {
    firstName: "",
    lastName: "Mosciski",
    id: "99d5b104-d04c-46a0-9366-b14da9ec11a0",
  },
  interlocutor: true,
  previousAuthor: true,
  message: "Molestiae molestias voluptate rerum. Dolores possimus id.",
  id: "c7873064-ee7c-49ae-a1c0-bd2d73f401ib",
  displayDate: false,
  date: new Date("2021-02-13T22:22:13.615Z"),
}

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

test("date tag isn't visible if previousDateIsSame flag is set to true", () => {
  const { queryByTestId } = renderer({ previousDateIsSame: true })
  const dateTagElement = queryByTestId(SlackDateTestIds.DateTag)
  expect(dateTagElement).not.toBeInTheDocument()
})

test("date tag is visible if previousDateIsSame flag is set to false", () => {
  const { queryByTestId } = renderer({ previousDateIsSame: false })
  const dateTagElement = queryByTestId(SlackDateTestIds.DateTag)
  expect(dateTagElement).toBeInTheDocument()
  expect(dateTagElement).toBeVisible()
})

test("avatar is visible if previousDateIsSame flag is set to false", () => {
  const { queryByTestId } = renderer({ previousDateIsSame: false })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).toBeInTheDocument()
  expect(textAvatarElement).toBeVisible()
})

test("avatar is visible if previousDateIsSame flag is set to true and previousAuthor false", () => {
  const { queryByTestId } = renderer({
    previousDateIsSame: false,
    previousAuthor: false,
  })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).toBeInTheDocument()
  expect(textAvatarElement).toBeVisible()
})

test("avatar is visible if previousDateIsSame flag is set to true and previousAuthor true", () => {
  const { queryByTestId } = renderer({
    previousDateIsSame: false,
    previousAuthor: true,
  })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).toBeInTheDocument()
  expect(textAvatarElement).toBeVisible()
})

test("avatar isn't visible if previousDateIsSame flag is set to true and previousAuthor false", () => {
  const { queryByTestId } = renderer({
    previousDateIsSame: true,
    previousAuthor: false,
  })
  const textAvatarElement = queryByTestId(AvatarTestIds.AvatarText)
  expect(textAvatarElement).not.toBeInTheDocument()
})
