/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import * as MockDate from "mockdate"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import MessageDateTag from "App/messages/components/message-date-tag.component"

type Properties = ComponentProps<typeof MessageDateTag>

const renderer = (props: Properties) => {
  const outcome = renderWithThemeAndIntl(<MessageDateTag {...props} />)

  return {
    ...outcome,
  }
}

MockDate.set("2000-2-1")

test("the correct translation is displaying for today date", () => {
  const { container } = renderer({
    date: new Date(),
  })
  expect(container).toHaveTextContent("[value] component.textToday")
})

test("the correct date format is displaying for current year", () => {
  const today = new Date()
  const yesterday = new Date(today.setDate(today.getDate() - 1))

  const { container } = renderer({
    date: yesterday,
  })

  expect(container).toHaveTextContent("Monday, January 31st")
})

test("the correct date format is displaying for previous year", () => {
  const today = new Date()
  const previousYear = new Date(today.setDate(today.getDate() - 366))

  const { container } = renderer({
    date: previousYear,
  })

  expect(container).toHaveTextContent("January 31st, 1999")
})
