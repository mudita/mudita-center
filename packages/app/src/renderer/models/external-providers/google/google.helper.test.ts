/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { createRruleString } from "Renderer/models/external-providers/google/google.helpers"

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
  expect(result).toEqual(
    `DTSTART:${dtstart}\n${rrule}\n\n\n`
  )
})
