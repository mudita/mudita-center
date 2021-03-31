/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
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
    "[value] view.name.messages.todaySlackDate"
  )
})
