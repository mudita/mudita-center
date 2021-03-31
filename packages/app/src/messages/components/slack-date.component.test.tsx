/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import moment from "moment"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { SlackDateTestIds } from "App/messages/components/slack-date-test-ids.enum"
import SlackDate from "App/messages/components/slack-date.component"

type Properties = ComponentProps<typeof SlackDate>

const renderer = (props: Properties) => {
  const outcome = renderWithThemeAndIntl(<SlackDate {...props} />)

  return {
    ...outcome,
  }
}

test("the correct translation is displaying for today date", () => {
  const { getByTestId } = renderer({
    date: new Date(),
  })
  expect(getByTestId(SlackDateTestIds.DateTag)).toHaveTextContent(
    "[value] view.generic.today"
  )
})

test("the correct date format is displaying for current year", () => {
  const today = new Date()
  const yesterday = new Date(today.setDate(today.getDate() - 1))

  const { getByTestId } = renderer({
    date: yesterday,
  })

  expect(
    moment(
      getByTestId(SlackDateTestIds.DateTag).textContent,
      "dddd, MMMM Do"
    ).isValid()
  ).toBeTruthy()
})

test("the correct date format is displaying for previous year", () => {
  const today = new Date()
  const previousYear = new Date(today.setDate(today.getDate() - 356))

  const { getByTestId } = renderer({
    date: previousYear,
  })

  expect(
    moment(
      getByTestId(SlackDateTestIds.DateTag).textContent,
      "MMMM Do, YYYY"
    ).isValid()
  ).toBeTruthy()
})
