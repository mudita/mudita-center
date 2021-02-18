/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { createRuleObject } from "Renderer/models/external-providers/google/google.helpers"

const base = {
  rrule:
    "RRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20210405T215959Z;INTERVAL=2;BYDAY=FR,MO,TH,TU",
  exdate: "EXDATE;TZID=Europe/Warsaw:20210226T114500",
  exrule: "EXRULE:FREQ=MONTHLY;COUNT=2",
  rdate: "RDATE;VALUE=DATE:20150609,20150611",
}

test("snapshot test since most the fields are private", () => {
  const result = createRuleObject(base)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "reccurence": RRuleSet {
        "_cache": null,
        "_exdate": Array [
          2021-02-26T11:45:00.000Z,
        ],
        "_exrule": Array [
          RRule {
            "_cache": null,
            "options": Object {
              "byeaster": null,
              "byhour": Array [
                12,
              ],
              "byminute": Array [
                3,
              ],
              "bymonth": null,
              "bymonthday": Array [
                17,
              ],
              "bynmonthday": Array [],
              "bynweekday": null,
              "bysecond": Array [
                41,
              ],
              "bysetpos": null,
              "byweekday": null,
              "byweekno": null,
              "byyearday": null,
              "count": 2,
              "dtstart": 2021-02-17T12:03:41.000Z,
              "freq": 1,
              "interval": 1,
              "tzid": undefined,
              "until": null,
              "wkst": 0,
            },
            "origOptions": Object {
              "count": 2,
              "dtstart": undefined,
              "freq": 1,
              "tzid": undefined,
            },
          },
        ],
        "_rdate": Array [
          2015-06-09T00:00:00.000Z,
          2015-06-11T00:00:00.000Z,
        ],
        "_rrule": Array [
          RRule {
            "_cache": null,
            "options": Object {
              "byeaster": null,
              "byhour": Array [
                12,
              ],
              "byminute": Array [
                3,
              ],
              "bymonth": null,
              "bymonthday": Array [],
              "bynmonthday": Array [],
              "bynweekday": null,
              "bysecond": Array [
                41,
              ],
              "bysetpos": null,
              "byweekday": Array [
                4,
                0,
                3,
                1,
              ],
              "byweekno": null,
              "byyearday": null,
              "count": null,
              "dtstart": 2021-02-17T12:03:41.000Z,
              "freq": 2,
              "interval": 2,
              "tzid": undefined,
              "until": 2021-04-05T21:59:59.000Z,
              "wkst": 6,
            },
            "origOptions": Object {
              "byweekday": Array [
                Weekday {
                  "n": undefined,
                  "weekday": 4,
                },
                Weekday {
                  "n": undefined,
                  "weekday": 0,
                },
                Weekday {
                  "n": undefined,
                  "weekday": 3,
                },
                Weekday {
                  "n": undefined,
                  "weekday": 1,
                },
              ],
              "dtstart": undefined,
              "freq": 2,
              "interval": 2,
              "tzid": undefined,
              "until": 2021-04-05T21:59:59.000Z,
              "wkst": Weekday {
                "n": undefined,
                "weekday": 6,
              },
            },
          },
        ],
        "dtstart": [Function],
        "options": Object {
          "byeaster": null,
          "byhour": Array [
            12,
          ],
          "byminute": Array [
            3,
          ],
          "bymonth": Array [
            2,
          ],
          "bymonthday": Array [
            17,
          ],
          "bynmonthday": Array [],
          "bynweekday": null,
          "bysecond": Array [
            41,
          ],
          "bysetpos": null,
          "byweekday": null,
          "byweekno": null,
          "byyearday": null,
          "count": null,
          "dtstart": 2021-02-17T12:03:41.000Z,
          "freq": 0,
          "interval": 1,
          "tzid": null,
          "until": null,
          "wkst": 0,
        },
        "origOptions": Object {},
        "tzid": [Function],
      },
    }
  `)
})
