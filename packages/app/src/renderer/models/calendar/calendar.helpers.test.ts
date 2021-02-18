/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { mapEvents } from "Renderer/models/calendar/calendar.helpers"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

const input: CalendarEvent[] = [
  {
    id: "google_123",
    name: "Example event",
    startDate: "2021-01-12T09:30:00.000Z",
    endDate: "2021-01-12T10:15:00.000Z",
    recurrence: {
      _cache: null,
      origOptions: {
        freq: 2,
        until: new Date("2021-02-25T21:59:59.000Z"),
        interval: 2,
      },
      options: {
        freq: 1,
        dtstart: new Date("2021-02-18T10:22:36.000Z"),
        interval: 5,
        wkst: 6,
        count: null,
        until: null,
        bysetpos: [],
        bymonth: [],
        bymonthday: [],
        bynmonthday: [],
        byyearday: [],
        byweekno: [],
        byweekday: [3],
        bynweekday: null,
        byhour: [10],
        byminute: [22],
        bysecond: [36],
        byeaster: null,
        tzid: null,
      },
    },
    provider: {
      type: Provider.Google,
      id: "123",
    },
  },
]

test("returns correct amount of recurring events", () => {
  const result = mapEvents(input)
  expect(result).toHaveLength(3)
})

test("return correct amount of recurring events plus single event", () => {
  const singleEvent = {
    id: "google_123",
    name: "Example event",
    startDate: "2021-01-12T09:30:00.000Z",
    endDate: "2021-01-12T10:15:00.000Z",
    provider: {
      type: Provider.Google,
      id: "123",
    },
  }
  const result = mapEvents([...input, singleEvent] )
  expect(result).toHaveLength(4)
})
