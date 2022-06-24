/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  createRruleString,
  mapEvents,
} from "App/__deprecated__/renderer/models/external-providers/google/google.helpers"
import { mockedGoogleEvents } from "App/__mocks__/google-events-list"

const base = {
  dtstart: "19970902T090000Z",
  rrule:
    "RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20210405T215959Z;INTERVAL=2;BYDAY=FR,MO,TH,TU",
  exdate: "EXDATE;TZID=Europe/Warsaw:20210226T114500",
  exrule: "EXRULE:FREQ=MONTHLY;COUNT=2",
  rdate: "RDATE;VALUE=DATE:20150609,20150611",
}

test("prepared rrule string with all of the fields", () => {
  const result = createRruleString(base)
  expect(result).toEqual(
    `DTSTART:${base.dtstart}\n${base.rrule}\n${base.exdate}\n${base.rdate}\n${base.exrule}`
  )
})

test("prepared rrule string with some of the fields", () => {
  const { rrule, dtstart } = base
  const result = createRruleString({ dtstart, rrule })
  expect(result).toEqual(`DTSTART:${dtstart}\n${rrule}\n\n\n`)
})

test("recurring logic mapped correctly1", () => {
  const events = [
    mockedGoogleEvents[0],
    {
      id: "id123",
      summary: "Meeting",
      start: { dateTime: "2020-01-01T10:00:00.000Z" },
      end: { dateTime: "2020-01-01T13:00:00.000Z" },
      recurrence: ["RRULE:FREQ=WEEKLY;UNTIL=20110701T170000Z"],
    },
  ]
  const [singleEvent, recurringEvent] = mapEvents(events)
  expect(singleEvent).not.toHaveProperty("recurrence")
  expect(recurringEvent).toHaveProperty("recurrence")
})
