/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { mapEvents } from "Renderer/models/calendar/calendar.helpers"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import moment from "moment"

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
  const result = mapEvents([...input, singleEvent])
  expect(result).toHaveLength(4)
})

test("generates correct start and end dates for each event", () => {
  const events = mapEvents(input)
  events.forEach((event, index) => {
    expect(event.startDate).toEqual(
      moment(input[0].startDate)
        .add(14 * (index + 1), "days")
        .toISOString()
    )
    expect(event.endDate).toEqual(
      moment(input[0].endDate)
        .add(14 * (index + 1), "days")
        .toISOString()
    )
  })
})

test("object keys are mapped correctly", () => {
  const events = mapEvents(input)
  events.forEach((event) => {
    expect(event.id).toEqual(input[0].id)
    expect(event.name).toEqual(input[0].name)
    expect(event.provider).toStrictEqual(input[0].provider)
    expect(event).not.toHaveProperty("recurrence")
  })
})
