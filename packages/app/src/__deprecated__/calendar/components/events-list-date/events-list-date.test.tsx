/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import EventsListDate from "App/__deprecated__/calendar/components/events-list-date/events-list-date.component"

const oneDayEvent = {
  id: "event-1",
  name: "event",
  startDate: "2020-02-12T10:00:00.000Z",
  endDate: "2020-02-12T11:00:00.000Z",
}
const multiDaysEvent = {
  id: "event-1",
  name: "event",
  startDate: "2020-02-12T10:00:00.000Z",
  endDate: "2020-02-14T11:00:00.000Z",
}
const oneDayResult = `Wednesday, February 12, 2020, 10:00 AM - 11:00 AM`
const multiDaysResult = `February 12, 2020, 10:00 AM - February 14, 2020, 11:00 AM`

test("show one day event date", () => {
  const { container } = renderWithThemeAndIntl(
    <EventsListDate
      startDate={oneDayEvent.startDate}
      endDate={oneDayEvent.endDate}
    />
  )
  expect(container).toHaveTextContent(oneDayResult)
})

test("show multi day event date", () => {
  const { container } = renderWithThemeAndIntl(
    <EventsListDate
      startDate={multiDaysEvent.startDate}
      endDate={multiDaysEvent.endDate}
    />
  )
  expect(container).toHaveTextContent(multiDaysResult)
})
