/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { convertEventsToICal } from "App/__deprecated__/calendar/helpers/convert-events/convert-events-to-ical"
import { eventsData } from "App/__deprecated__/seeds/calendar"

test("correct amount of events is converted", () => {
  const convertedEvents = convertEventsToICal(eventsData)
  const result = convertedEvents.print()
  expect(result.events).toHaveLength(eventsData.length)
})

test("result has correct prodId", () => {
  const convertedEvents = convertEventsToICal(eventsData)
  const result = convertedEvents.print()
  expect(result).toHaveProperty("prodId", "//mudita.com//Mudita Center//EN")
})

test("converted event has expected keys and properties", () => {
  const singleEvent = eventsData[0]
  const convertedEvents = convertEventsToICal([singleEvent])
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id, start, end, summary } = convertedEvents.print().events[0]
  expect(id).toEqual(singleEvent.id)
  expect(start).toEqual(singleEvent.startDate)
  expect(end).toEqual(singleEvent.endDate)
  expect(summary).toEqual(singleEvent.name)
})
