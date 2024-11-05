/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AlarmPresenter } from "./alarm-presenter"
import { AlarmObject, EventInput } from "Core/data-sync/types"

const presenter = new AlarmPresenter()

describe("AlarmPresenter - serializeToObject", () => {
  describe("basic serialization", () => {
    test("serializes an alarm with all fields defined", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [
            [
              "3",
              "1",
              "0",
              "/system/assets/audio/alarm/alarm_cymbals.mp3",
              "1",
              "0",
              "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA,SU",
            ],
          ],
        },
      }

      const expected = [
        {
          repeatDays: [1, 2, 3, 4, 5, 6, 7],
          isEnabled: true,
          hour: 1,
          minute: 0,
          snoozeTime: 0,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles multiple alarm entries", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [
            [
              "4",
              "2",
              "0",
              "/system/assets/audio/alarm/alarm_cymbals.mp3",
              "1",
              "0",
              "",
            ],
            [
              "5",
              "3",
              "0",
              "/system/assets/audio/alarm/alarm_cymbals.mp3",
              "1",
              "0",
              "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR",
            ],
          ],
        },
      }

      const expected = [
        {
          repeatDays: [],
          isEnabled: true,
          hour: 2,
          minute: 0,
          snoozeTime: 0,
        },
        {
          repeatDays: [1, 2, 3, 4, 5],
          isEnabled: true,
          hour: 3,
          minute: 0,
          snoozeTime: 0,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })
  })

  describe("isEnabled field", () => {
    test("handles isEnabled true", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [["7", "5", "30", "", "1", "10", ""]],
        },
      }

      const expected = [
        {
          repeatDays: [],
          isEnabled: true,
          hour: 5,
          minute: 30,
          snoozeTime: 10,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles isEnabled false", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [["8", "6", "45", "", "0", "15", ""]],
        },
      }

      const expected = [
        {
          repeatDays: [],
          isEnabled: false,
          hour: 6,
          minute: 45,
          snoozeTime: 15,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles missing isEnabled value, defaults to false", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [["9", "7", "15", "", "", "5", ""]],
        },
      }

      const expected = [
        {
          repeatDays: [],
          isEnabled: false,
          hour: 7,
          minute: 15,
          snoozeTime: 5,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })
  })

  describe("repeatDays field", () => {
    test("handles empty repeatDays array", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [["10", "8", "0", "", "1", "0", ""]],
        },
      }

      const expected = [
        {
          repeatDays: [],
          isEnabled: true,
          hour: 8,
          minute: 0,
          snoozeTime: 0,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles repeatDays with one value", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [["11", "9", "15", "", "1", "5", "FREQ=WEEKLY;BYDAY=MO"]],
        },
      }

      const expected = [
        {
          repeatDays: [1],
          isEnabled: true,
          hour: 9,
          minute: 15,
          snoozeTime: 5,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles repeatDays with multiple values", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [
            ["12", "10", "30", "", "1", "10", "FREQ=WEEKLY;BYDAY=MO,WE,FR"],
          ],
        },
      }

      const expected = [
        {
          repeatDays: [1, 3, 5],
          isEnabled: true,
          hour: 10,
          minute: 30,
          snoozeTime: 10,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    test("handles repeatDays with all values", () => {
      const input: EventInput = {
        alarms: {
          columns: [
            "_id",
            "hour",
            "minute",
            "music_tone",
            "enabled",
            "snooze_duration",
            "rrule",
          ],
          values: [
            [
              "13",
              "11",
              "0",
              "",
              "1",
              "20",
              "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA,SU",
            ],
          ],
        },
      }

      const expected = [
        {
          repeatDays: [1, 2, 3, 4, 5, 6, 7],
          isEnabled: true,
          hour: 11,
          minute: 0,
          snoozeTime: 20,
        },
      ]

      const result = presenter.serializeToObject(input)
      expect(result).toEqual(expected)
    })

    describe("handling missing or invalid data", () => {
      test("returns an empty array when alarms are undefined", () => {
        const input: EventInput = {
          alarms: undefined,
        }

        const expected: AlarmObject[] = []

        const result = presenter.serializeToObject(input)
        expect(result).toEqual(expected)
      })

      test("handles missing snooze_duration, defaults to 0", () => {
        const input: EventInput = {
          alarms: {
            columns: [
              "_id",
              "hour",
              "minute",
              "music_tone",
              "enabled",
              "snooze_duration",
              "rrule",
            ],
            values: [["6", "4", "0", "", "1", "", ""]],
          },
        }

        const expected = [
          {
            repeatDays: [],
            isEnabled: true,
            hour: 4,
            minute: 0,
            snoozeTime: 0,
          },
        ]

        const result = presenter.serializeToObject(input)
        expect(result).toEqual(expected)
      })
    })
  })
})
